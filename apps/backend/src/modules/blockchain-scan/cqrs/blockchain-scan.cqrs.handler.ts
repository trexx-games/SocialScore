import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { CommandResult } from '@nestjs-architects/typed-cqrs';

import { BlockchainScanService } from '../blockchain-scan.service';

import { PerformBlockScanCommand } from './blockchain-scan.cqrs.input';

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
@CommandHandler(PerformBlockScanCommand)
export class PerformBlockScanCommandHandler<Data>
  implements IInferredCommandHandler<PerformBlockScanCommand>
{
  constructor(readonly service: BlockchainScanService) {}
  async execute(
    command: PerformBlockScanCommand
  ): Promise<CommandResult<PerformBlockScanCommand>> {
    return this.service.performBlockchainSourceScan(command.args);
  }
}

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
