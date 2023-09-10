import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenExpiredError } from 'jsonwebtoken';
import { PasswordCipher } from 'nestjs-dev-utilities';
import { TWO_FACTOR_APP_NAME } from '@apps/config/constant';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import {
  FindOnePortalUserQuery,
  UpdateOnePortalUserCommand,
} from '@apps/modules/portal-user/cqrs/portal-user.cqrs.input';
import { UtilsService } from '@apps/modules/utils/utils.service';
import { TokenIssuer } from '@apps/config/setting.config';
import {
  CreatePortalAccessTokenCommand,
  RefreshPortalAccessTokenCommand,
} from '@apps/modules/portal-auth/cqrs/portal-auth.cqrs.input';
import { AccessTokenContext } from '@apps/modules/auth/auth.interface';
import {
  GenerateTwoFactorCommand,
  VerifyTwoFactorQuery,
} from '@apps/modules/two-factor/cqrs';
import {
  BindTwoFactorInput,
  UnbindTwoFactorInput,
} from '@apps/modules/auth/dto/auth.input';
import {
  PortalAuthChangePasswordInput,
  PortalAuthSignInInput,
} from './dto/portal-auth.input';
import { AccessTokenDto } from '@apps/modules/auth/dto/auth.dto';
import { PortalUserEntity } from '@apps/modules/portal-user/portal-user.entity';
import { PortalAuthAccessTokenFactory } from './portal-auth.factory';
import { VerifyPortalUser2FACodeQuery } from './cqrs/portal-auth.cqrs.input';

@Injectable()
export class PortalAuthService {
  constructor(
    private readonly configService: ConfigService<ENV>,
    private readonly utils: UtilsService,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
    private readonly accessTokenFactory: PortalAuthAccessTokenFactory
  ) {}

  /**
   * ---------------------------------
   * MISCELLANEOUS
   * ---------------------------------
   */
  signIn = async (
    input: PortalAuthSignInInput,
    ipAddress?: string
  ): Promise<AccessTokenDto> => {
    // check whether user exists before create access token
    const { data } = await this.queryBus.execute(
      new FindOnePortalUserQuery({
        query: { filter: { username: { eq: input.username } } },
        options: { nullable: false },
      })
    );

    // check password whether is corrected
    const isMatched = await PasswordCipher.check(input.password, data.password);
    if (!isMatched) {
      throw new BadRequestException('Invalid username or password!');
    }

    // create access token
    const { data: token } = await this.createAccessToken({
      input: {
        reference: data.reference,
        platform: 'portal',
      },
    });

    this.commandBus.execute(
      new UpdateOnePortalUserCommand({
        query: { filter: { id: { eq: data.id } } },
        input: { lastLoginDate: new Date() },
      })
    );

    // create activity log
    // this.commandBus.execute(
    //   new CreateOnePortalUserActivityCommand({
    //     input: {
    //       action: 'SIGNIN',
    //       title: 'Sign In',
    //       description: 'Sign In to portal',
    //       ipAddress,
    //       userId: data.id,
    //     },
    //   })
    // );

    return token;
  };

  // generate two factor from user reference
  changePassword = async (
    user: PortalUserEntity,
    input: PortalAuthChangePasswordInput,
    ipAddress?: string
  ) => {
    if (!user.twoFactorSecret) {
      throw new BadRequestException('Please setup 2FA in order to proceed!');
    }
    // validate 2FA before proceed update password
    await this.verifyTwoFactor({ query: { user, code: input.code } });
    // update password
    const { data } = await this.commandBus.execute(
      new UpdateOnePortalUserCommand({
        query: { filter: { id: { eq: user.id } } },
        input: { password: input.password },
      })
    );

    // create log
    // this.commandBus.execute(
    //   new CreateOnePortalUserActivityCommand({
    //     input: {
    //       action: 'UPDATE',
    //       title: 'Update password',
    //       description: 'Update login password',
    //       ipAddress,
    //       userId: user.id,
    //     },
    //   })
    // );

    return data;
  };

  /**
   * ---------------------------------
   * TWO FACTOR
   * ---------------------------------
   */
  // generate two factor from user reference
  generateTwoFactor = async (user: PortalUserEntity) => {
    if (user.twoFactorSecret) {
      throw new BadRequestException('You already got 2FA setup!');
    }
    const reference = user.username;
    const { data } = await this.commandBus.execute(
      new GenerateTwoFactorCommand({
        input: { reference, title: `${TWO_FACTOR_APP_NAME} Portal` },
      })
    );
    return data;
  };

  // verify user input two factor
  verifyTwoFactor: CqrsQueryFunc<
    VerifyPortalUser2FACodeQuery,
    VerifyPortalUser2FACodeQuery['args']
  > = async ({ query, options }) => {
    const silence = options?.silence ?? false;
    try {
      let userData: PortalUserEntity = null;
      // find user
      if (typeof query.user === 'number') {
        const { data: foundUser } = await this.queryBus.execute(
          new FindOnePortalUserQuery({
            query: { filter: { id: { eq: query.user } } },
            options: { nullable: false },
          })
        );
        userData = foundUser;
      } else {
        userData = query.user;
      }
      const secret = userData.twoFactorSecret;
      // check user whether has 2FA setup
      if (!userData.twoFactorSecret) throw new Error('User got no 2FA setup!');

      // verify 2FA code
      return this.queryBus.execute(
        new VerifyTwoFactorQuery({
          query: { code: query.code, secret },
          options: { silence, ...options },
        })
      );
    } catch (e) {
      if (!silence) throw new BadRequestException(e.message);
      return { success: false, data: false, message: e.message };
    }
  };

  /**
   * Check / Enable 2FA
   */
  bindTwoFactor = async (
    user: PortalUserEntity,
    input: BindTwoFactorInput,
    ipAddress?: string
  ): Promise<PortalUserEntity> => {
    try {
      if (user.twoFactorSecret) {
        throw new Error('User has already got 2FA setup!');
      }
      await this.queryBus.execute(
        new VerifyTwoFactorQuery({
          query: { code: input.code, secret: input.secret },
        })
      );

      // bind two 2FA to user profile
      const { data } = await this.commandBus.execute(
        new UpdateOnePortalUserCommand({
          query: { filter: { id: { eq: user.id } } },
          input: { twoFactorSecret: input.secret },
        })
      );

      // this.commandBus.execute(
      //   new CreateOnePortalUserActivityCommand({
      //     input: {
      //       action: 'CREATE',
      //       title: 'Bind 2FA',
      //       description: 'Bind 2FA for account',
      //       ipAddress,
      //       userId: user.id,
      //     },
      //   })
      // );

      return data.updated;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  /**
   * Request unbind 2FA
   */
  unbindTwoFactor = async (
    user: PortalUserEntity,
    input: UnbindTwoFactorInput,
    ipAddress?: string
  ): Promise<boolean> => {
    try {
      if (!user.twoFactorSecret) {
        throw new Error("Can't unbind due to no 2FA setup!");
      }
      // verify two factor code
      await this.queryBus.execute(
        new VerifyTwoFactorQuery({
          query: { code: input.code, secret: user.twoFactorSecret },
        })
      );
      // unbind two factor code
      await this.commandBus.execute(
        new UpdateOnePortalUserCommand({
          query: { filter: { id: { eq: user.id } } },
          input: { twoFactorSecret: null },
        })
      );
      // this.commandBus.execute(
      //   new CreateOnePortalUserActivityCommand({
      //     input: {
      //       action: 'DELETE',
      //       title: 'Unbind 2FA',
      //       description: 'Unbind 2FA for account',
      //       ipAddress,
      //       userId: user.id,
      //     },
      //   })
      // );
      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  /**
   * ---------------------------------
   * ACCESS TOKEN
   * ---------------------------------
   */
  createAccessToken: CqrsCommandFunc<
    CreatePortalAccessTokenCommand,
    CreatePortalAccessTokenCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;
    try {
      const record = await this.accessTokenFactory.create({
        iss: 'ccgds',
        sub: input.reference,
        aud: input.platform,
      });

      return { success: true, data: record };
    } catch (e) {
      if (!silence) throw new BadRequestException(e);
      return { success: false, message: e.message };
    }
  };

  // refresh access token
  refreshAccessToken: CqrsCommandFunc<
    RefreshPortalAccessTokenCommand,
    RefreshPortalAccessTokenCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;

    try {
      const jwt = this.configService.get('adminJwt');
      const decodedToken =
        await this.jwtService.verifyAsync<AccessTokenContext>(
          input.refreshToken,
          { ignoreExpiration: false, publicKey: jwt.refreshPublicKey }
        );

      const userRef = decodedToken.sub; // default as user referralCode (based on token)
      const defaultPlatform = decodedToken.aud; // default accessing platform (based on token)
      const defaultIssuer = decodedToken.iss; // default token issuer (based on token)

      // check if refresh token is issued by TokenIssuer
      if (defaultIssuer !== TokenIssuer) {
        throw new Error('Issuer not allowed');
      }

      // check if refresh token is same with x-ccgds-platform header
      if (defaultPlatform !== input.platform) {
        throw new Error('Mismatch platform!');
      }

      // find user account info based on token payload "sub"
      const { data: user } = await this.queryBus.execute(
        new FindOnePortalUserQuery({
          query: { filter: { reference: { eq: userRef } } },
          options: { relation: false, silence: true, nullable: true },
        })
      );

      if (!user) throw new Error('Refresh token is malformed');

      // all ok, create new access token
      return this.createAccessToken({
        input: {
          reference: userRef,
          platform: input.platform,
        },
      });
    } catch (e) {
      if (silence) {
        return { success: false, message: e.message };
      }
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      }
      throw new BadRequestException(e);
    }
  };
}
