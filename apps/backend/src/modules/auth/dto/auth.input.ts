import { Field, InputType } from '@nestjs/graphql';
import { Allow, IsNotEmpty, IsString } from 'class-validator';

@InputType({ description: 'The input used to connect smart wallet' })
export class ConnectInput {
  @Allow()
  @Field({
    nullable: true,
    description: `Optional: username for smart wallet. If not provided will random generate one`,
  })
  username?: string;

  @Allow()
  @Field({ description: 'The signing message' })
  message: string;

  @Allow()
  @Field({ description: 'The signing signature' })
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
