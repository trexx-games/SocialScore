import isEmpty from 'lodash/isEmpty';
import { CurrentUser, IpAddress } from 'nestjs-dev-utilities';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RequestPlatform } from '@apps/decorators/request-platform.decorator';
import { TwoFactorInfoDto } from '@apps/modules/two-factor/dto/two-factor.dto';
import { UserEntity } from '@apps/modules/user/user.entity';
import { UserDto } from '@apps/modules/user/dto/user.dto';
import { AuthJwtOrGuestGuard } from './guards/auth-jwt-with-guest.guard';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { AccessTokenInfo } from './auth.interface';
import { AccessTokenDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import {
  BindTwoFactorInput,
  SignInInput,
  RefreshAccessTokenInput,
  RegisterInput,
  UnbindTwoFactorInput,
} from './dto/auth.input';

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

  // check whether wallet can register
  @Mutation(() => Boolean, {
    description: 'This API used for check whether wallet is registerable',
  })
  async isRegisterable(
    @Args({ name: 'input', type: () => SignInInput })
    input: SignInInput
  ) {
    return this.service.isRegisterable(input);
  }

  // connect wallet
  @Mutation(() => AccessTokenDto, {
    description: 'This API used for login',
  })
  async signIn(
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => SignInInput })
    input: SignInInput
  ) {
    return this.service.signIn(input, ipAddress);
  }

  // register wallet
  @Mutation(() => AccessTokenDto, {
    description: `This API used to requesting new token whenever switching visiting company`,
  })
  async register(
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => RegisterInput })
    input: RegisterInput
  ) {
    return this.service.register(input, ipAddress);
  }

  // refresh token
  @Mutation(() => AccessTokenDto, {
    description: `This API used to exchange new access token with an old token`,
  })
  async refreshToken(
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
  @UseGuards(AuthJwtGuard)
  @Mutation(() => TwoFactorInfoDto, {
    description: 'This API used to generate 2fa info for user to bind later',
  })
  async generateTwoFactor(@CurrentUser() currentUser: AccessTokenInfo) {
    const user = currentUser.user;
    const data = await this.service.generateTwoFactor(user);
    return data;
  }

  /**
   * Bind 2FA to user
   */
  @UseGuards(AuthJwtGuard)
  @Mutation(() => Boolean, { description: 'Bind 2FA to user' })
  async bindTwoFactor(
    @CurrentUser() currentUser: AccessTokenInfo,
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
   * Unbind 2FA from user
   */
  @UseGuards(AuthJwtGuard)
  @Mutation(() => Boolean, {
    description: 'Unbind 2FA',
  })
  async unbindTwoFactor(
    @CurrentUser() currentUser: AccessTokenInfo,
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => UnbindTwoFactorInput })
    input: UnbindTwoFactorInput
  ) {
    return this.service.unbindTwoFactor(currentUser.user, input, ipAddress);
  }

  /**
   * Verify 2FA from user
   */
  @UseGuards(AuthJwtGuard)
  @Mutation(() => Boolean, {
    description:
      'This API used to verify 2fa code from user. This API mostly do not needed',
  })
  async verifyTwoFactor(
    @CurrentUser() currentUser: AccessTokenInfo,
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
