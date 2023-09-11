import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { GraphQLJSONObject } from 'graphql-type-json';

import { AirstackService } from './airstack.service';

// @Controller('airstack')
@Resolver()
export class AirstackController {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly service: AirstackService,
    readonly config: ConfigService<ENV>
  ) {}

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async tokenTransferScan(@Args('address') address: string) {
    return this.service.tokenTransfersScan(address);
  }

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async tokenBalanceScan(@Args('address') address: string) {
    return this.service.tokenBalancesScan(address);
  }
}
