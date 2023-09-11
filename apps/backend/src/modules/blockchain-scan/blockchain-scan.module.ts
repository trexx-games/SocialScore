import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BlockchainScanService } from './blockchain-scan.service';
import { BlockchainScanController } from './blockchain-scan.controller';

@Module({
  imports: [CqrsModule],
  providers: [BlockchainScanService, BlockchainScanController],
  exports: [BlockchainScanService],
})
export class BlockchainScanModule {}
