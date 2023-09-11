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
  @Field({ description: 'Wallet address that going to link with smart wallet' })
  address: string;

  @Allow()
  @Field({ description: 'The signing message' })
  message: string;

  @Allow()
  @Field({ description: 'The signing signature' })
  signature: string;
}
