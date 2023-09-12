import { UtilsModule } from '@apps/modules/utils/utils.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { AirstackService } from '../airstack/airstack.service';

import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs';
import { WalletEntity } from './wallet.entity';
import { WalletResolver } from './wallet.resolver';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([WalletEntity])],
    }),
    CqrsModule,
    UtilsModule,
  ],
  providers: [
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    WalletService,
    WalletResolver,
    AirstackService,
  ],
  exports: [WalletService],
})
export class WalletModule {}
