import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  BadRequestException,
  Controller,
  Get,
  Injectable,
} from '@nestjs/common';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { TWO_FACTOR_APP_NAME } from '@apps/config/constant';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { fetchQuery, init } from '@airstack/node';
import { AirstackService } from './airstack.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

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
  async walletTokenTransfers(@Args('address') address: string) {
    return this.service.walletTokenTransfers(address);
  }
}
