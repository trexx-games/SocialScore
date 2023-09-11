import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { AirstackService } from './airstack.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

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
  async walletTokenTransfers(@Args('address') address: string) {
    return this.service.walletTokenTransfers(address);
  }
}
