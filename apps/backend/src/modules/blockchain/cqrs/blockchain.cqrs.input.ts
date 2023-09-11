import { AbstractCqrsQueryInput } from 'nestjs-typed-cqrs';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export class BlockchainVerifySignerMessageQuery extends AbstractCqrsQueryInput<
  string,
  {
    message: string;
    signature: string;
  }
> {}

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
/**
 * This event triggered from blockchain callback
 */
