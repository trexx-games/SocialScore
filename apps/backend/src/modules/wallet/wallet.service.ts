import { UtilsService } from '@apps/modules/utils/utils.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { FilterQueryBuilder } from '@ptc-org/nestjs-query-typeorm/src/query';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { Repository } from 'typeorm';

import { CreateOneQueueJobCommand } from '../queue/cqrs';
import { FindOneUserQuery } from '../user/cqrs';
import { UserEntity } from '../user/user.entity';
import { WalletScanProcessorInput } from '../wallet-scan/processors';

import {
  CountWalletQuery,
  CreateOneWalletCommand,
  DeleteOneWalletCommand,
  FindManyWalletQuery,
  FindOneWalletQuery,
  UpdateOneWalletCommand,
} from './cqrs/wallet.cqrs.input';
import { WalletEntity } from './wallet.entity';

@Injectable()
export class WalletService {
  private readonly filterQueryBuilder: FilterQueryBuilder<WalletEntity>;

  constructor(
    @InjectRepository(WalletEntity)
    private readonly repo: Repository<WalletEntity>,
    @InjectQueryService(WalletEntity)
    private readonly service: QueryService<WalletEntity>,
    private readonly utils: UtilsService,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    this.filterQueryBuilder = new FilterQueryBuilder<WalletEntity>(this.repo);
  }

  /**
   * ------------------------------------------------------
   * Basic Functions
   * ------------------------------------------------------
   */
  /**
   * Find one record
   */
  findOne: CqrsQueryFunc<FindOneWalletQuery, FindOneWalletQuery['args']> =
    async ({ query, options }) => {
      const nullable = options?.nullable ?? true;
      const silence = options?.silence ?? false;

      try {
        // query builder
        const builder = this.filterQueryBuilder.select(query);

        // build relation
        WalletEntity.buildJoinRelation(builder, options);

        // actual query
        const result = await builder.getOne();

        // check record
        if (!nullable && !result) {
          throw new Error('Wallet record is not found!');
        }

        // result
        return { success: true, data: result };
      } catch (e) {
        if (!silence) throw new BadRequestException(e);
        return { success: false, message: e.message };
      }
    };

  /**
   * Find many records
   */
  findMany: CqrsQueryFunc<FindManyWalletQuery, FindManyWalletQuery['args']> =
    async ({ query, options }) => {
      const nullable = options?.nullable ?? true;
      const silence = options?.silence ?? false;

      try {
        // query builder
        const builder = this.filterQueryBuilder.select(query);

        // build relation
        WalletEntity.buildJoinRelation(builder, options);

        // actual query
        const result = await builder.getMany();

        // check record
        if (!nullable && result.length === 0) {
          throw new Error('No any wallet records were found!');
        }

        // result
        return { success: true, data: result };
      } catch (e) {
        if (!silence) throw new BadRequestException(e);
        return { success: false, message: e.message };
      }
    };

  /**
   * count records
   */
  count: CqrsQueryFunc<CountWalletQuery, CountWalletQuery['args']> = async ({
    query,
  }) => {
    try {
      // query builder
      const builder = this.filterQueryBuilder.select({
        filter: query,
      });
      // actual query
      const result = await builder.getCount();
      // result
      return { success: true, data: result };
    } catch (e) {
      return { success: false, message: e.message, data: 0 };
    }
  };

  /**
   * Create one record
   */
  createOne: CqrsCommandFunc<
    CreateOneWalletCommand,
    CreateOneWalletCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;
    const { parentId, parentAddress, ...restInput } = input;
    let parent: UserEntity = null;
    try {
      // if (isNil(parentId) && isNil(parentAddress)) {
      //   throw new Error('Please provide parent reference!');
      // }
      const { data: found } = await this.findOne({
        query: { filter: { address: { eq: input.address } } },
        options: { nullable: true },
      });
      if (found) throw new Error('Wallet has been registered before!');

      // check whether parent exists
      if (parentId || parentAddress) {
        const { data } = await this.queryBus.execute(
          new FindOneUserQuery({
            query: {
              filter: {
                ...(parentAddress
                  ? { address: { iLike: `%${parentAddress}%` } }
                  : { id: { eq: parentId } }),
              },
            },
            options: { nullable: false, relation: false },
          })
        );
        parent = data;
      }

      // create record
      const record = await this.repo.save({
        parent,
        ...restInput,
      });

      return { success: true, data: record };
    } catch (error) {
      if (!silence) throw new BadRequestException(error);
      return { success: false, message: error.message };
    }
  };

  /**
   * Update record
   */
  updateOne: CqrsCommandFunc<
    UpdateOneWalletCommand,
    UpdateOneWalletCommand['args']
  > = async ({ query, input, options }) => {
    const silence = options?.silence ?? false;

    try {
      // find record
      const { data: found } = await this.findOne({
        query: query,
        options: { nullable: false },
      });

      // update record
      const data = await this.service.updateOne(found.id, input);

      return { success: true, data: { before: found, updated: data } };
    } catch (error) {
      if (!silence) throw new BadRequestException(error);
      return { success: false, message: error.message };
    }
  };

  /**
   * Update one record
   */
  deleteOne: CqrsCommandFunc<
    DeleteOneWalletCommand,
    DeleteOneWalletCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;

    try {
      const { data } = await this.findOne({
        query: { filter: { id: { eq: input } } },
        options: { nullable: false },
      });

      // delete record
      const deleted = await this.service.deleteOne(input);
      return {
        success: true,
        data: {
          ...data,
          ...deleted,
        },
      };
    } catch (e) {
      if (!silence) throw new BadRequestException(e);
      return { success: false, message: e.message };
    }
  };

  /**
   * ------------------------------------------------------
   * Helper Functions
   * ------------------------------------------------------
   */
  addNewWallet = async (input: {
    address: string;
    parentId?: number;
  }): Promise<WalletEntity> => {
    const address = input.address;
    // if everything good, then link the wallet to smart wallet
    const { data } = await this.createOne({
      input: {
        address: address,
        parentId: input.parentId,
      },
    });

    this.performScanWallet(address);
    return data;
  };

  performScanWallet = (address: string, type: 'link' | 'sync' = 'link') => {
    const currentTime = new Date().toISOString();
    const jobId = `${type}-wallet-${address}-${currentTime}`;
    // create job for wallet scanning
    this.commandBus.execute(
      new CreateOneQueueJobCommand<WalletScanProcessorInput>({
        input: {
          id: jobId,
          name: 'LinkWalletSync',
          queue: 'general',
          reference: address,
          data: {
            address: address,
          },
        },
      })
    );
  };
}
