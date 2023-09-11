import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UtilsModule } from '@apps/modules/utils/utils.module';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { EventHandlers, CommandHandlers, QueryHandlers } from './cqrs';
import { WalletResolver } from './wallet.resolver';
import { WalletService } from './wallet.service';
import { WalletEntity } from './wallet.entity';

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
  ],
  exports: [WalletService],
})
export class WalletModule {}
