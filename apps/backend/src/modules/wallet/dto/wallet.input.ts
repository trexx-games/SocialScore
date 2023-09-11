import { Field, InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';

// create wallet input
export class CreateWalletInput {
  address: string;
  parentId?: number;
  parentAddress?: string;
  lastSyncDate?: string;
}

// update wallet input
export class UpdateWalletInput {
  address: string;
  lastSyncDate?: string;
}

// link wallet input
@InputType({ description: 'The input used to link wallet to smart wallet' })
export class WalletLinkInput {
  @Allow()
  @Field()
  address: string;

  @Allow()
  @Field()
  message: string;

  @Allow()
  @Field()
  signature: string;
}
