import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { AbstractDto } from 'nestjs-dev-utilities';

@ObjectType('Wallet')
export class WalletDto extends AbstractDto {
  @FilterableField()
  address: string;

  @Field(() => Date, { nullable: true })
  lastSyncDate?: string;
}

@ObjectType('WalletTokenType')
export class WalletTokenTypeDto {
  @Field()
  type: string;

  @Field()
  amount: number;
}

@ObjectType('WalletTokenBalance')
export class WalletTokenBalanceDto {
  @Field()
  total: number;

  @Field(() => [WalletTokenTypeDto])
  balances: WalletTokenTypeDto[];
}

@ObjectType('WalletTokenTransfer')
export class WalletTokenTransferDto {
  @Field()
  total: number;

  @Field(() => [WalletTokenTypeDto])
  transfers: WalletTokenTypeDto[];
}

@ObjectType('WalletProfile')
export class WalletProfileDto {
  @Field()
  address: string;

  @Field(() => WalletTokenBalanceDto)
  tokenBalances: WalletTokenBalanceDto;

  @Field(() => WalletTokenTransferDto)
  tokenTransfers: WalletTokenTransferDto;
}
