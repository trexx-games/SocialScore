import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BlockchainScanService } from './blockchain-scan.service';
import { GraphQLJSONObject } from 'graphql-type-json';

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
    return await this.service.dexSwapScanning(walletAddress);
  }

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async nounsDaoVoteScanning(@Args('walletAddress') walletAddress: string) {
    return await this.service.nounsDaoVoteScanning(walletAddress);
  }

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async nounsDaoProposalScanning(@Args('walletAddress') walletAddress: string) {
    return await this.service.nounsDaoProposalScanning(walletAddress);
  }
}
