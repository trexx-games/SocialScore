import { Field, InputType } from '@nestjs/graphql';
import { Allow, IsNotEmpty, IsString } from 'class-validator';

@InputType({ description: 'The input used to connect smart wallet' })
export class ConnectInput {
  @Allow()
  @Field()
  address: string;

  @Allow()
  @Field({ nullable: true })
  username?: string;

  @Allow()
  @Field()
  message: string;

  @Allow()
  @Field()
  signature: string;
}

@InputType({
  description:
    'The input used to prolong user access. NOTE: refreshToken must matched with connected wallet',
})
export class RefreshAccessTokenInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
