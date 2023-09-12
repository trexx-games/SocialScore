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

import {
  CountWalletScanRecordQuery,
  CreateOneWalletScanRecordCommand,
  DeleteOneWalletScanRecordCommand,
  FindManyWalletScanRecordQuery,
  FindOneWalletScanRecordQuery,
  UpdateOneWalletScanRecordCommand,
} from './cqrs/wallet-scan-record.cqrs.input';
import { WalletScanRecordEntity } from './wallet-scan-record.entity';

@Injectable()
export class WalletScanRecordService {
  private readonly filterQueryBuilder: FilterQueryBuilder<WalletScanRecordEntity>;

  constructor(
    @InjectRepository(WalletScanRecordEntity)
    private readonly repo: Repository<WalletScanRecordEntity>,
    @InjectQueryService(WalletScanRecordEntity)
    private readonly service: QueryService<WalletScanRecordEntity>,
    private readonly utils: UtilsService,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    this.filterQueryBuilder = new FilterQueryBuilder<WalletScanRecordEntity>(
      this.repo
    );
  }

  /**
   * ------------------------------------------------------
   * Basic Functions
   * ------------------------------------------------------
   */
  /**
   * Find one record
   */
  findOne: CqrsQueryFunc<
    FindOneWalletScanRecordQuery,
    FindOneWalletScanRecordQuery['args']
  > = async ({ query, options }) => {
    const nullable = options?.nullable ?? true;
    const silence = options?.silence ?? false;

    try {
      // query builder
      const builder = this.filterQueryBuilder.select(query);

      // build relation
      WalletScanRecordEntity.buildJoinRelation(builder, options);

      // actual query
      const result = await builder.getOne();

      // check record
      if (!nullable && !result) {
        throw new Error('WalletScanRecord record is not found!');
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
  findMany: CqrsQueryFunc<
    FindManyWalletScanRecordQuery,
    FindManyWalletScanRecordQuery['args']
  > = async ({ query, options }) => {
    const nullable = options?.nullable ?? true;
    const silence = options?.silence ?? false;

    try {
      // query builder
      const builder = this.filterQueryBuilder.select(query);

      // build relation
      WalletScanRecordEntity.buildJoinRelation(builder, options);

      // actual query
      const result = await builder.getMany();

      // check record
      if (!nullable && result.length === 0) {
        throw new Error('No any wallet-scan-record records were found!');
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
  count: CqrsQueryFunc<
    CountWalletScanRecordQuery,
    CountWalletScanRecordQuery['args']
  > = async ({ query }) => {
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
    CreateOneWalletScanRecordCommand,
    CreateOneWalletScanRecordCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;
    try {
      const { data: found } = await this.findOne({
        query: {},
        options: { nullable: true },
      });
      if (found)
        throw new Error('WalletScanRecord has been registered before!');

      // create record
      const record = await this.repo.save(input);

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
    UpdateOneWalletScanRecordCommand,
    UpdateOneWalletScanRecordCommand['args']
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
    DeleteOneWalletScanRecordCommand,
    DeleteOneWalletScanRecordCommand['args']
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
}
