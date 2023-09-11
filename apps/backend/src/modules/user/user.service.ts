import { UtilsService } from '@apps/modules/utils/utils.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { FilterQueryBuilder } from '@ptc-org/nestjs-query-typeorm/src/query';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { Repository } from 'typeorm';

import {
  CountUserQuery,
  CreateOneUserCommand,
  DeleteOneUserCommand,
  FindManyUserQuery,
  FindOneUserQuery,
  UpdateOneUserCommand,
} from './cqrs/user.cqrs.input';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly filterQueryBuilder: FilterQueryBuilder<UserEntity>;

  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
    @InjectQueryService(UserEntity)
    private readonly service: QueryService<UserEntity>,
    private readonly utils: UtilsService,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    this.filterQueryBuilder = new FilterQueryBuilder<UserEntity>(this.repo);
  }

  /**
   * ------------------------------------------------------
   * Basic Functions
   * ------------------------------------------------------
   */
  /**
   * Find one record
   */
  findOne: CqrsQueryFunc<FindOneUserQuery, FindOneUserQuery['args']> = async ({
    query,
    options,
  }) => {
    const nullable = options?.nullable ?? true;
    const silence = options?.silence ?? false;

    try {
      // query builder
      const builder = this.filterQueryBuilder.select(query);

      // build relation
      UserEntity.buildJoinRelation(builder, options);

      // actual query
      const result = await builder.getOne();

      // check record
      if (!nullable && !result) {
        throw new Error('User record is not found!');
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
  findMany: CqrsQueryFunc<FindManyUserQuery, FindManyUserQuery['args']> =
    async ({ query, options }) => {
      const nullable = options?.nullable ?? true;
      const silence = options?.silence ?? false;

      try {
        // query builder
        const builder = this.filterQueryBuilder.select(query);

        // build relation
        UserEntity.buildJoinRelation(builder, options);

        // actual query
        const result = await builder.getMany();

        // check record
        if (!nullable && result.length === 0) {
          throw new Error('No any user records were found!');
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
  count: CqrsQueryFunc<CountUserQuery, CountUserQuery['args']> = async ({
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
    CreateOneUserCommand,
    CreateOneUserCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;
    try {
      const { data: found } = await this.findOne({
        query: { filter: { username: { eq: input.username } } },
        options: { nullable: true },
      });
      if (found) throw new Error('User has been registered before!');

      // generate unique referral code
      const username = await this.utils.generateUsername(input.username);

      // create record
      const record = await this.repo.save({
        username: input.username ?? username,
        ...input,
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
    UpdateOneUserCommand,
    UpdateOneUserCommand['args']
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
    DeleteOneUserCommand,
    DeleteOneUserCommand['args']
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
