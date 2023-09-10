import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AccessToken')
export class AccessTokenDto {
  @Field()
  accessToken: string;

  @Field()
  expiresIn: number;

  @Field()
  refreshToken: string;

  @Field()
  refreshExpiresIn: number;

  constructor(
    accessToken: string,
    expiresIn: number,
    refreshToken: string,
    refreshExpiresIn: number
  ) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken;
    this.refreshExpiresIn = refreshExpiresIn;
  }
}
