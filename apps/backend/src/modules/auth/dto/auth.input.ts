import { Field, InputType } from '@nestjs/graphql';
import { Allow, IsNotEmpty, IsString } from 'class-validator';

@InputType({ description: 'This input used to sign in' })
export class SignInInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@InputType({ description: 'This input used to connect & register wallet.' })
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field({ nullable: true })
  referralCode?: string;
}

@InputType({
  description:
    'This input used to prolong user access. NOTE: refreshToken must matched with connected wallet',
})
export class RefreshAccessTokenInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

@InputType({ description: 'This input used to bind 2FA.' })
export class BindTwoFactorInput {
  @Allow()
  @Field()
  secret: string;

  @Allow()
  @Field()
  code: string;
}

@InputType({ description: 'This input used to unbind 2FA.' })
export class UnbindTwoFactorInput {
  @Allow()
  @Field()
  code: string;
}
