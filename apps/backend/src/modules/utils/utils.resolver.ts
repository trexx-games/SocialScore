import { ConfigEnvironmentType as ENV } from '@stack/server';
import GraphQLJSON from 'graphql-type-json';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { UtilsService } from './utils.service';

@Resolver()
export class UtilsResolver {
  constructor(
    readonly service: UtilsService,
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    private readonly config: ConfigService<ENV>
  ) {}

  //
  @Query(() => GraphQLJSON, { nullable: true })
  async utilsTest() {
    return null;
  }
}
