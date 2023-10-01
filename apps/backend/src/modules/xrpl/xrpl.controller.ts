import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { GraphQLJSONObject } from 'graphql-type-json';

import { XrplService } from './xrpl.service';

@Resolver()
export class XrplController {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly service: XrplService,
    readonly config: ConfigService<ENV>
  ) {}

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async paymentsScan(@Args('address') address: string) {
    return this.service.paymentsScan(address);
  }

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async ammDepositScan(@Args('address') address: string) {
    return this.service.ammDepositScan(address);
  }

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async ammWithdrawScan(@Args('address') address: string) {
    return this.service.ammWithdrawScan(address);
  }

  @Query(() => GraphQLJSONObject, {
    nullable: true,
  })
  async nfTokenMintScan(@Args('address') address: string) {
    return this.service.nfTokenMintScan(address);
  }
}
