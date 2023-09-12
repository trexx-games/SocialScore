import { UtilsModule } from '@apps/modules/utils/utils.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProcessorHandlers, ProcessorServices } from './processors';
import { WalletScanService } from './wallet-scan.service';

@Module({
  imports: [CqrsModule, UtilsModule],
  providers: [...ProcessorServices, ...ProcessorHandlers, WalletScanService],
  exports: [WalletScanService],
})
export class WalletScanModule {}
