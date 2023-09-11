import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { FilterQueryBuilder } from '@ptc-org/nestjs-query-typeorm/src/query';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { UtilsService } from '@apps/modules/utils/utils.service';
import { BlockchainSourceEntity } from './blockchain-source.entity';
import {
  CountBlockchainSourceQuery,
  CreateOneBlockchainSourceCommand,
  DeleteOneBlockchainSourceCommand,
  FindManyBlockchainSourceQuery,
  FindOneBlockchainSourceQuery,
  UpdateOneBlockchainSourceCommand,
} from './cqrs/blockchain-source.cqrs.input';

@Injectable()
export class BlockchainSourceService {
  private readonly filterQueryBuilder: FilterQueryBuilder<BlockchainSourceEntity>;

  constructor(
    @InjectRepository(BlockchainSourceEntity)
    private readonly repo: Repository<BlockchainSourceEntity>,
    @InjectQueryService(BlockchainSourceEntity)
    private readonly service: QueryService<BlockchainSourceEntity>,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    this.filterQueryBuilder = new FilterQueryBuilder<BlockchainSourceEntity>(
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
    FindOneBlockchainSourceQuery,
    FindOneBlockchainSourceQuery['args']
  > = async ({ query, options }) => {
    const nullable = options?.nullable ?? true;
    const silence = options?.silence ?? false;

    try {
      // query builder
      const builder = this.filterQueryBuilder.select(query);

      // actual query
      const result = await builder.getOne();

      // check record
      if (!nullable && !result) {
        throw new Error('BlockchainSource record is not found!');
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
    FindManyBlockchainSourceQuery,
    FindManyBlockchainSourceQuery['args']
  > = async ({ query, options }) => {
    const nullable = options?.nullable ?? true;
    const silence = options?.silence ?? false;

    try {
      // query builder
      const builder = this.filterQueryBuilder.select(query);

      // actual query
      const result = await builder.getMany();

      // check record
      if (!nullable && result.length === 0) {
        throw new Error('No any blockchain-source records were found!');
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
    CountBlockchainSourceQuery,
    CountBlockchainSourceQuery['args']
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
    CreateOneBlockchainSourceCommand,
    CreateOneBlockchainSourceCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;
    try {
      const { data: found } = await this.findOne({
        query: { filter: { address: { eq: input.address } } },
        options: { nullable: true },
      });
      if (found) throw new Error('Blockchain source already existed!');

      // create record
      const record = await this.service.createOne(input);

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
    UpdateOneBlockchainSourceCommand,
    UpdateOneBlockchainSourceCommand['args']
  > = async ({ query, input, options }) => {
    const silence = options?.silence ?? false;

    try {
      // find record
      const { data: found } = await this.findOne({
        query: query,
        options: { nullable: false },
      });
      // update record
      const updated = await this.service.updateOne(found.id, {
        ...input,
      });
      return { success: true, data: { before: found, updated } };
    } catch (error) {
      if (!silence) throw new BadRequestException(error);
      return { success: false, message: error.message };
    }
  };

  /**
   * Update one record
   */
  deleteOne: CqrsCommandFunc<
    DeleteOneBlockchainSourceCommand,
    DeleteOneBlockchainSourceCommand['args']
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
