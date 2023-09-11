import * as Ethers from 'nestjs-ethers';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { CoreConfigModule, ConfigEnvironmentType as ENV } from '@stack/server';
import { EventHandlers, CommandHandlers, QueryHandlers } from './cqrs';
import { BlockchainService } from './blockchain.service';

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
