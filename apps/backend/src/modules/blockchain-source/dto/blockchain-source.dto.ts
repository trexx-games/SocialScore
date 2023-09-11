import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AbstractDto } from 'nestjs-dev-utilities';

import {
  BlockchainSourceStatus,
  ISourceMeta,
} from '../blockchain-source.interface';

@ObjectType('BlockchainSource')
export class BlockchainSourceDto extends AbstractDto {
  @FilterableField()
  name: string;

  @FilterableField()
  address: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLJSONObject)
  meta?: ISourceMeta;

  @Field(() => BlockchainSourceStatus)
  status?: BlockchainSourceStatus;
}
