import { BadRequestException } from '@nestjs/common';
import {
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
  QueryBus,
  QueryHandler,
} from '@nestjs/cqrs';
import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';
import { ethers } from 'ethers';

import { BlockchainService } from '../blockchain.service';

import { BlockchainVerifySignerMessageQuery } from './blockchain.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */

@QueryHandler(BlockchainVerifySignerMessageQuery)
export class BlockchainVerifySignerMessageQueryHandler
  implements IInferredQueryHandler<BlockchainVerifySignerMessageQuery>
{
  constructor(readonly queryBus: QueryBus) {}
  async execute(
    query: BlockchainVerifySignerMessageQuery
  ): Promise<QueryResult<BlockchainVerifySignerMessageQuery>> {
    const { query: input, options } = query.args;
    const silence = options?.silence ?? false;

    try {
      const recoveredAddress = ethers.utils.verifyMessage(
        input.message,
        input.signature
      );
      if (!recoveredAddress) {
        throw new Error('Invalid signature to verify message!');
      }

      return { success: true, data: recoveredAddress };
    } catch (e) {
      if (!silence) throw new BadRequestException(e);
      return { success: false, message: e.message };
    }
  }
}
