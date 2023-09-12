import { BlockchainSourceEntity } from '@apps/modules/blockchain-source/blockchain-source.entity';
import {
  AbstractCqrsCommandInput,
  RecordMutateOptions,
} from 'nestjs-typed-cqrs';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export class PerformBlockScanCommand extends AbstractCqrsCommandInput<
  BlockchainSourceEntity,
  {
    source: BlockchainSourceEntity;
    walletAddress: string;
  },
  false,
  RecordMutateOptions
> {}

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
