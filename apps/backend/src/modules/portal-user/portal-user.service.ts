import { Repository } from 'typeorm';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { FilterQueryBuilder } from '@ptc-org/nestjs-query-typeorm/src/query';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { PasswordCipher } from 'nestjs-dev-utilities';
import { PortalUserEntity } from './portal-user.entity';
import {
  CountPortalUserQuery,
  CreateOnePortalUserCommand,
  DeleteOnePortalUserCommand,
  FindManyPortalUserQuery,
  FindOnePortalUserQuery,
  UpdateOnePortalUserCommand,
} from './cqrs/portal-user.cqrs.input';
import { UtilsService } from '@apps/modules/utils/utils.service';

@Injectable()
export class PortalUserService {
  private readonly filterQueryBuilder: FilterQueryBuilder<PortalUserEntity>;

  constructor(
    @InjectRepository(PortalUserEntity)
    private readonly repo: Repository<PortalUserEntity>,
    @InjectQueryService(PortalUserEntity)
    private readonly service: QueryService<PortalUserEntity>,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly utils: UtilsService
  ) {
    this.filterQueryBuilder = new FilterQueryBuilder<PortalUserEntity>(
      this.repo
    );
  }

  /**
   * Find one record
   */
  findOne: CqrsQueryFunc<
    FindOnePortalUserQuery,
    FindOnePortalUserQuery['args']
  > = async ({ query, options }) => {
    const nullable = options?.nullable ?? true;
    const silence = options?.silence ?? false;

    try {
      // query builder
      const builder = this.filterQueryBuilder.select(query);

      // build relation
      PortalUserEntity.buildJoinRelation(builder, options);

      // actual query
      const result = await builder.getOne();

      // check record
      if (!nullable && !result) {
        throw new Error('Portal user record is not found!');
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
    FindManyPortalUserQuery,
    FindManyPortalUserQuery['args']
  > = async ({ query, options }) => {
    const nullable = options?.nullable ?? true;
    const silence = options?.silence ?? false;

    try {
      // query builder
      const builder = this.filterQueryBuilder.select(query);

      // build relation
      PortalUserEntity.buildJoinRelation(builder, options);

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
   * Count records
   */
  count: CqrsQueryFunc<CountPortalUserQuery, CountPortalUserQuery['args']> =
    async ({ query }) => {
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
    CreateOnePortalUserCommand,
    CreateOnePortalUserCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;
    try {
      const { data: found } = await this.findOne({
        query: { filter: { username: { eq: input.username } } },
        options: { nullable: true },
      });
      if (found) throw new Error('Username/Email already existed!');

      const reference = await this.utils.generateReferenceCode();
      const password = await PasswordCipher.hash(input.password);

      const record = await this.service.createOne({
        ...input,
        password,
        reference,
      });

      return {
        success: true,
        data: record,
      };
    } catch (error) {
      if (!silence) throw new BadRequestException(error);
      throw new BadRequestException(error.message);
    }
  };

  /**
   * Update record
   */
  updateOne: CqrsCommandFunc<
    UpdateOnePortalUserCommand,
    UpdateOnePortalUserCommand['args']
  > = async ({ query, input, options }) => {
    const silence = options?.silence ?? false;

    try {
      // find record
      const { data: found } = await this.findOne({
        query: query,
        options: { nullable: false },
      });

      let password = found.password;
      if (input.password) {
        password = await PasswordCipher.hash(input.password);
      }

      const updated = await this.service.updateOne(found.id, {
        ...input,
        password,
      });

      return {
        success: true,
        data: {
          updated,
          before: found,
        },
      };
    } catch (error) {
      if (!silence) throw new BadRequestException(error);
      throw new BadRequestException(error.message);
    }
  };

  /**
   * Delete one record
   */
  deleteOne: CqrsCommandFunc<
    DeleteOnePortalUserCommand,
    DeleteOnePortalUserCommand['args']
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
          id: data.id,
        },
      };
    } catch (e) {
      if (!silence) throw new BadRequestException(e);
      return { success: false, message: e.message };
    }
  };
}
