import { Query } from '@ptc-org/nestjs-query-core';
import {
  AbstractCqrsCommandInput,
  AbstractCqrsQueryInput,
  RecordMutateOptions,
  RecordQueryWithJoinOptions,
} from 'nestjs-typed-cqrs';

import {
  CreateWalletScanRecordInput,
  UpdateWalletScanRecordInput,
} from '../dto/wallet-scan-record.input';
import {
  WalletScanRecordEntity,
  WalletScanRecordJoinRelationType,
} from '../wallet-scan-record.entity';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
/**
 * Find one record
 */
export class FindOneWalletScanRecordQuery extends AbstractCqrsQueryInput<
  WalletScanRecordEntity,
  undefined,
  RecordQueryWithJoinOptions<WalletScanRecordJoinRelationType>,
  WalletScanRecordEntity
> {}

/**
 * Find many records
 */
export class FindManyWalletScanRecordQuery extends AbstractCqrsQueryInput<
  WalletScanRecordEntity,
  undefined,
  RecordQueryWithJoinOptions<WalletScanRecordJoinRelationType>,
  WalletScanRecordEntity[]
> {}

/**
 * find & count records
 */
export class CountWalletScanRecordQuery extends AbstractCqrsQueryInput<
  WalletScanRecordEntity,
  Query<WalletScanRecordEntity>['filter'],
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
export class CreateOneWalletScanRecordCommand extends AbstractCqrsCommandInput<
  WalletScanRecordEntity,
  CreateWalletScanRecordInput
> {}

/**
 * Update one record
 */
export class UpdateOneWalletScanRecordCommand extends AbstractCqrsCommandInput<
  WalletScanRecordEntity,
  UpdateWalletScanRecordInput,
  true,
  RecordMutateOptions,
  {
    before: WalletScanRecordEntity;
    updated: WalletScanRecordEntity;
  }
> {}

/**
 * Delete one record
 */
export class DeleteOneWalletScanRecordCommand extends AbstractCqrsCommandInput<
  WalletScanRecordEntity,
  number
> {}
