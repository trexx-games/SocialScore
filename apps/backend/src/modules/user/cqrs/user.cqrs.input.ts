import {
  AbstractCqrsQueryInput,
  AbstractCqrsCommandInput,
  RecordQueryWithJoinOptions,
  RecordMutateOptions,
} from 'nestjs-typed-cqrs';
import { Query } from '@ptc-org/nestjs-query-core';
import { CreateUserInput, UpdateUserInput } from '../dto/user.input';
import { UserEntity, UserJoinRelationType } from '../user.entity';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
/**
 * Find one record
 */
export class FindOneUserQuery extends AbstractCqrsQueryInput<
  UserEntity,
  undefined,
  RecordQueryWithJoinOptions<UserJoinRelationType>,
  UserEntity
> {}

/**
 * Find many records
 */
export class FindManyUserQuery extends AbstractCqrsQueryInput<
  UserEntity,
  undefined,
  RecordQueryWithJoinOptions<UserJoinRelationType>,
  UserEntity[]
> {}

/**
 * find one by
 */
export class FindOneUserByQuery extends AbstractCqrsQueryInput<
  UserEntity,
  { id: number; address: string },
  RecordQueryWithJoinOptions<UserJoinRelationType>,
  UserEntity
> {}

/**
 * find & count records
 */
export class CountUserQuery extends AbstractCqrsQueryInput<
  UserEntity,
  Query<UserEntity>['filter'],
  undefined,
  number
> {}

/**
 * ---------------------------
 * COMMAND
 * ---------------------------
 */
/**
 * Create one record
 */
export class CreateOneUserCommand extends AbstractCqrsCommandInput<
  UserEntity,
  CreateUserInput
> {}

/**
 * Update one record
 */
export class UpdateOneUserCommand extends AbstractCqrsCommandInput<
  UserEntity,
  UpdateUserInput,
  true,
  RecordMutateOptions,
  {
    before: UserEntity;
    updated: UserEntity;
  }
> {}

/**
 * Delete one record
 */
export class DeleteOneUserCommand extends AbstractCqrsCommandInput<
  UserEntity,
  number
> {}
