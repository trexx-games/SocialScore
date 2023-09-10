import isEmpty from 'lodash/isEmpty';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentUser, IpAddress } from 'nestjs-dev-utilities';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessTokenDto } from '@apps/modules/auth/dto/auth.dto';
import { PortalUserDto } from '@apps/modules/portal-user/dto/portal-user.dto';
import { PortalUserEntity } from '@apps/modules/portal-user/portal-user.entity';
import { RequestPlatform } from '@apps/decorators/request-platform.decorator';
import { TwoFactorInfoDto } from '@apps/modules/two-factor/dto/two-factor.dto';
import {
  BindTwoFactorInput,
  RefreshAccessTokenInput,
  UnbindTwoFactorInput,
} from '@apps/modules/auth/dto/auth.input';
import { PortalAuthJwtGuard } from './guards/portal-auth-jwt.guard';
import { PortalAuthJwtOrGuestGuard } from './guards/portal-auth-jwt-with-guest.guard';
import { AccessTokenPortalUser } from './portal-auth.interface';
import { PortalAuthService } from './portal-auth.service';
import {
  PortalAuthChangePasswordInput,
  PortalAuthSignInInput,
} from './dto/portal-auth.input';

@Resolver(() => AccessTokenDto)
export class PortalAuthResolver {
  constructor(
    readonly service: PortalAuthService,
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus
  ) {}

  @UseGuards(PortalAuthJwtOrGuestGuard)
  @Query(() => PortalUserDto, {
    nullable: true,
    description: 'This API used to retrieve profile',
  })
  async getPortalAuthProfile(
    @CurrentUser() currentUser: AccessTokenPortalUser
  ): Promise<PortalUserEntity> {
    if (isEmpty(currentUser)) return null;
    return currentUser.user;
  }

  @Mutation(() => AccessTokenDto, {
    description: 'This API used for login',
  })
  async portalSignIn(
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => PortalAuthSignInInput })
    input: PortalAuthSignInInput
  ) {
    const data = await this.service.signIn(input, ipAddress);
    return data;
  }

  // refresh token
  @Mutation(() => AccessTokenDto, {
    description: `This API used to exchange new access token with an old token`,
  })
  async portalRefreshToken(
    @RequestPlatform() platform,
    @Args({ name: 'input', type: () => RefreshAccessTokenInput })
    input: RefreshAccessTokenInput
  ) {
    const { data } = await this.service.refreshAccessToken({
      input: {
        platform,
        ...input,
      },
    });
    return data;
  }

  /**
   * Generate 2FA for user to bind
   */
  @UseGuards(PortalAuthJwtGuard)
  @Mutation(() => Boolean, {
    description: 'This API used to change login password',
  })
  async portalChangePassword(
    @CurrentUser() currentUser: AccessTokenPortalUser,
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => PortalAuthChangePasswordInput })
    input: PortalAuthChangePasswordInput
  ) {
    const user = currentUser.user;
    const data = await this.service.changePassword(user, input, ipAddress);
    return !!data;
  }

  /**
   * Generate 2FA for user to bind
   */
  @UseGuards(PortalAuthJwtGuard)
  @Mutation(() => TwoFactorInfoDto, {
    description: 'This API used to generate 2fa info for user to bind later',
  })
  async portalGenerateTwoFactor(
    @CurrentUser() currentUser: AccessTokenPortalUser
  ) {
    const user = currentUser.user;
    const data = await this.service.generateTwoFactor(user);
    return data;
  }

  /**
   * Bind 2FA to user
   */
  @UseGuards(PortalAuthJwtGuard)
  @Mutation(() => Boolean, { description: 'Bind 2FA to user' })
  async portalBindTwoFactor(
    @CurrentUser() currentUser: AccessTokenPortalUser,
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => BindTwoFactorInput })
    input: BindTwoFactorInput
  ) {
    const data = await this.service.bindTwoFactor(
      currentUser.user,
      input,
      ipAddress
    );
    return !!data.twoFactorSecret;
  }

  /**
   * Request unbind 2FA from user
   */
  @UseGuards(PortalAuthJwtGuard)
  @Mutation(() => Boolean, {
    description: 'Unbind two factor',
  })
  async portalUnbindTwoFactor(
    @IpAddress() ipAddress: string,
    @CurrentUser() currentUser: AccessTokenPortalUser,
    @Args({ name: 'input', type: () => UnbindTwoFactorInput })
    input: UnbindTwoFactorInput
  ) {
    return this.service.unbindTwoFactor(currentUser.user, input, ipAddress);
  }

  /**
   * Verify 2FA from user
   */
  @UseGuards(PortalAuthJwtGuard)
  @Mutation(() => Boolean, {
    description:
      'This API used to verify 2fa code from user. This API mostly do not needed',
  })
  async portalVerifyTwoFactor(
    @CurrentUser() currentUser: AccessTokenPortalUser,
    @Args({ name: 'code' }) code: string
  ) {
    const user = currentUser.user;
    const { data } = await this.service.verifyTwoFactor({
      query: { user, code },
      options: { silence: true },
    });
    return data;
  }
}
