import { AbstractDto } from 'nestjs-dev-utilities';
import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('Wallet')
export class WalletDto extends AbstractDto {
  @FilterableField()
  address: string;

  @Field(() => Date, { nullable: true })
  lastSyncDate?: string;
}
