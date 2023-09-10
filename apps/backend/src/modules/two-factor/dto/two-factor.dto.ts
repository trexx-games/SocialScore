import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('TwoFactorInfo', {
  description: 'The 2fa info used to bind to user',
})
export class TwoFactorInfoDto {
  @Field()
  secret: string;

  @Field()
  output: string;
}
