import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BlockchainScanController } from './blockchain-scan.controller';
import { BlockchainScanService } from './blockchain-scan.service';

@Module({
  imports: [CqrsModule],
  providers: [BlockchainScanService, BlockchainScanController],
  exports: [BlockchainScanService],
})
export class BlockchainScanModule {}
