import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

import {
  BlockchainSourceStatus,
  ISourceMeta,
} from '../blockchain-source.interface';

@InputType({ description: 'The input used to create blockchain source' })
export class CreateBlockchainSourceInput {
  @Allow()
  @Field({ description: 'The blockchain source name' })
  name: string;

  @Allow()
  @Field({ description: 'The blockchain source address' })
  address: string;

  @Allow()
  @Field({ description: 'The blockchain description name', nullable: true })
  description?: string;

  @Allow()
  @Field(() => GraphQLJSONObject, {
    description: 'The blockchain source meta data',
  })
  meta: ISourceMeta;

  @Allow()
  @Field(() => BlockchainSourceStatus, {
    description: 'The blockchain source statuses',
    defaultValue: BlockchainSourceStatus.ACTIVATED,
  })
  status: BlockchainSourceStatus;
}

@InputType({ description: 'The input used to update blockchain source' })
export class UpdateBlockchainSourceInput extends PartialType(
  CreateBlockchainSourceInput
) {}
