import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV, CoreConfigModule } from '@stack/server';
import * as Ethers from 'nestjs-ethers';

import { BlockchainService } from './blockchain.service';
import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs';

@Module({
  imports: [
    Ethers.EthersModule.forRootAsync({
      imports: [CoreConfigModule],
      inject: [ConfigService<ENV>],
      useFactory: (config: ConfigService) => {
        return {
          network: Ethers.POLYGON_NETWORK,
        };
      },
    }),
    CqrsModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    BlockchainService,
  ],
  exports: [BlockchainService],
})
export class BlockchainModule {}
