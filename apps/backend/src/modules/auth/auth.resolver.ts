import isEmpty from 'lodash/isEmpty';
import { CurrentUser, IpAddress } from 'nestjs-dev-utilities';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '@apps/modules/user/user.entity';
import { UserDto } from '@apps/modules/user/dto/user.dto';
import { AuthJwtOrGuestGuard } from './guards/auth-jwt-with-guest.guard';
import { AccessTokenInfo } from './auth.interface';
import { AccessTokenDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ConnectInput, RefreshAccessTokenInput } from './dto/auth.input';

@Resolver(() => AccessTokenDto)
export class AuthResolver {
  constructor(
    readonly service: AuthService,
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus
  ) {}

  // get wallet profile
  @UseGuards(AuthJwtOrGuestGuard)
  @Query(() => UserDto, {
    nullable: true,
    description: 'This API used to retrieve current profile',
  })
  async getAuthProfile(
    @CurrentUser() currentUser: AccessTokenInfo
  ): Promise<UserEntity> {
    if (isEmpty(currentUser)) return null;
    return currentUser.user;
  }

  // connect wallet
  @Mutation(() => AccessTokenDto, {
    description: 'This API used for login',
  })
  async signIn(
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => ConnectInput })
    input: ConnectInput
  ) {
    return this.service.signIn(input);
  }

  // refresh token
  @Mutation(() => AccessTokenDto, {
    description: `This API used to exchange new access token with an old token`,
  })
  async refreshToken(
    @Args({ name: 'input', type: () => RefreshAccessTokenInput })
    input: RefreshAccessTokenInput
  ) {
    const { data } = await this.service.refreshAccessToken({
      input: {
        ...input,
      },
    });
    return data;
  }
}
