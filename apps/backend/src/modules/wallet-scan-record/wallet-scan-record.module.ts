import { UtilsModule } from '@apps/modules/utils/utils.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { WalletScanRecordDto } from './dto/wallet-scan-record.dto';
import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs';
import { WalletScanRecordEntity } from './wallet-scan-record.entity';
import { WalletScanRecordResolver } from './wallet-scan-record.resolver';
import { WalletScanRecordService } from './wallet-scan-record.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([WalletScanRecordEntity]),
        CqrsModule,
        UtilsModule,
      ],
      resolvers: [
        {
          EntityClass: WalletScanRecordEntity,
          DTOClass: WalletScanRecordDto,
          create: {
            disabled: true,
          },
          update: {
            disabled: true,
          },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
      ],
    }),
    CqrsModule,
    UtilsModule,
  ],
  providers: [
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    WalletScanRecordService,
    WalletScanRecordResolver,
  ],
  exports: [WalletScanRecordService],
})
export class WalletScanRecordModule {}
