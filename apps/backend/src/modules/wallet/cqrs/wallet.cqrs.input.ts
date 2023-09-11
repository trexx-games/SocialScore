import { Query } from '@ptc-org/nestjs-query-core';
import {
  AbstractCqrsCommandInput,
  AbstractCqrsQueryInput,
  RecordMutateOptions,
  RecordQueryWithJoinOptions,
} from 'nestjs-typed-cqrs';

import { CreateWalletInput, UpdateWalletInput } from '../dto/wallet.input';
import { WalletEntity, WalletJoinRelationType } from '../wallet.entity';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
/**
 * Find one record
 */
export class FindOneWalletQuery extends AbstractCqrsQueryInput<
  WalletEntity,
  undefined,
  RecordQueryWithJoinOptions<WalletJoinRelationType>,
  WalletEntity
> {}

/**
 * Find many records
 */
export class FindManyWalletQuery extends AbstractCqrsQueryInput<
  WalletEntity,
  undefined,
  RecordQueryWithJoinOptions<WalletJoinRelationType>,
  WalletEntity[]
> {}

/**
 * find & count records
 */
export class CountWalletQuery extends AbstractCqrsQueryInput<
  WalletEntity,
  Query<WalletEntity>['filter'],
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
export class CreateOneWalletCommand extends AbstractCqrsCommandInput<
  WalletEntity,
  CreateWalletInput
> {}

/**
 * Update one record
 */
export class UpdateOneWalletCommand extends AbstractCqrsCommandInput<
  WalletEntity,
  UpdateWalletInput,
  true,
  RecordMutateOptions,
  {
    before: WalletEntity;
    updated: WalletEntity;
  }
> {}

/**
 * Delete one record
 */
export class DeleteOneWalletCommand extends AbstractCqrsCommandInput<
  WalletEntity,
  number
> {}
