import { Query } from '@ptc-org/nestjs-query-core';
import {
  AbstractCqrsCommandInput,
  AbstractCqrsQueryInput,
  RecordMutateOptions,
  RecordQueryOptions,
} from 'nestjs-typed-cqrs';

import { BlockchainSourceEntity } from '../blockchain-source.entity';
import {
  CreateBlockchainSourceInput,
  UpdateBlockchainSourceInput,
} from '../dto/blockchain-source.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
/**
 * Find one record
 */
export class FindOneBlockchainSourceQuery extends AbstractCqrsQueryInput<
  BlockchainSourceEntity,
  undefined,
  RecordQueryOptions,
  BlockchainSourceEntity
> {}

/**
 * Find many records
 */
export class FindManyBlockchainSourceQuery extends AbstractCqrsQueryInput<
  BlockchainSourceEntity,
  undefined,
  RecordQueryOptions,
  BlockchainSourceEntity[]
> {}

/**
 * find & count records
 */
export class CountBlockchainSourceQuery extends AbstractCqrsQueryInput<
  BlockchainSourceEntity,
  Query<BlockchainSourceEntity>['filter'],
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
export class CreateOneBlockchainSourceCommand extends AbstractCqrsCommandInput<
  BlockchainSourceEntity,
  CreateBlockchainSourceInput
> {}

/**
 * Update one record
 */
export class UpdateOneBlockchainSourceCommand extends AbstractCqrsCommandInput<
  BlockchainSourceEntity,
  UpdateBlockchainSourceInput,
  true,
  RecordMutateOptions,
  {
    before: BlockchainSourceEntity;
    updated: BlockchainSourceEntity;
  }
> {}

/**
 * Delete one record
 */
export class DeleteOneBlockchainSourceCommand extends AbstractCqrsCommandInput<
  BlockchainSourceEntity,
  number
> {}
