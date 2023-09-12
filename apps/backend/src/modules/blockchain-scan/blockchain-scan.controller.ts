import { NOUNS_ADDRESS, UNISWAP_ADDRESS } from '@apps/config/constant';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { GraphQLJSONObject } from 'graphql-type-json';

import { BlockchainScanService } from './blockchain-scan.service';

@Resolver()
export class BlockchainScanController {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly service: BlockchainScanService,
    readonly config: ConfigService<ENV>
  ) {}

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async dexSwapScanning(@Args('walletAddress') walletAddress: string) {
    return await this.service.dexSwapScanning({
      walletAddress,
      sourceAddress: UNISWAP_ADDRESS,
    });
  }

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async nounsDaoVoteScanning(@Args('walletAddress') walletAddress: string) {
    return await this.service.nounsDaoVoteScanning({
      walletAddress,
      sourceAddress: NOUNS_ADDRESS,
    });
  }

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async nounsDaoProposalScanning(@Args('walletAddress') walletAddress: string) {
    return await this.service.nounsDaoProposalScanning({
      walletAddress,
      sourceAddress: NOUNS_ADDRESS,
    });
  }
}
