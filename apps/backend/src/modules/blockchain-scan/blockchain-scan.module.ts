import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  ProcessorHandlers,
  ProcessorServices,
} from '../wallet-scan/processors';

import { BlockchainScanController } from './blockchain-scan.controller';
import { BlockchainScanService } from './blockchain-scan.service';

@Module({
  imports: [CqrsModule],
  providers: [
    ...ProcessorServices,
    ...ProcessorHandlers,
    BlockchainScanService,
    BlockchainScanController,
  ],
  exports: [BlockchainScanService],
})
export class BlockchainScanModule {}
