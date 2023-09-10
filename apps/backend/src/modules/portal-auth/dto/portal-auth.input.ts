import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class PortalAuthSignInInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class PortalAuthChangePasswordInput {
  @Field({ description: 'New password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field({ description: '2FA code for validation' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
