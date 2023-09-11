import { UserDto } from '@apps/modules/user/dto/user.dto';
import { UserEntity } from '@apps/modules/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import isEmpty from 'lodash/isEmpty';
import { CurrentUser, IpAddress } from 'nestjs-dev-utilities';

import { AccessTokenDto } from './dto/auth.dto';
import { ConnectInput, RefreshAccessTokenInput } from './dto/auth.input';
import { AuthJwtOrGuestGuard } from './guards/auth-jwt-with-guest.guard';
import { AccessTokenInfo } from './auth.interface';
import { AuthService } from './auth.service';

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
    description: 'This API used for connect smart wallet',
  })
  async connect(
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => ConnectInput })
    input: ConnectInput
  ) {
    return this.service.connect(input);
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
