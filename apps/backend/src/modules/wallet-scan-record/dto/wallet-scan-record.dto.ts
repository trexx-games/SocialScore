import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AbstractDto } from 'nestjs-dev-utilities';

@ObjectType('WalletScanRecord')
export class WalletScanRecordDto extends AbstractDto {
  @FilterableField()
  type: string;

  @FilterableField()
  block: number;

  @FilterableField()
  txHash: string;

  @Field()
  sourceId: number;

  @Field(() => GraphQLJSONObject)
  meta: any;
}
