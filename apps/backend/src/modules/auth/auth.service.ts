import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenExpiredError } from 'jsonwebtoken';
import { TokenIssuer } from '@apps/config/setting.config';
import { UserEntity } from '@apps/modules/user/user.entity';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { UserService } from '@apps/modules/user/user.service';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { UserStatusType } from '@apps/modules/user/user.constant';
import { AccessTokenFactory } from './access-token.factory';
import { UpdateOneUserCommand } from '@apps/modules/user/cqrs';
import { AccessTokenContext } from './auth.interface';
import { AccessTokenDto } from './dto/auth.dto';
import {
  GenerateTwoFactorCommand,
  VerifyTwoFactorQuery,
} from '@apps/modules/two-factor/cqrs';
import {
  CreateAccessTokenCommand,
  RefreshAccessTokenCommand,
  VerifyUser2FACodeQuery,
} from './cqrs/auth.cqrs.input';
import {
  BindTwoFactorInput,
  SignInInput,
  RegisterInput,
  UnbindTwoFactorInput,
} from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ENV>,
    private readonly userService: UserService,
    private readonly accessTokenFactory: AccessTokenFactory
  ) {}

  /**
   * Register wallet
   */
  register = async (
    input: RegisterInput,
    ipAddress?: string
  ): Promise<AccessTokenDto> => {
    const { referralCode, ...restInput } = input;
    // find parent with referral code
    const { data: parent } = await this.userService.findOne({
      query: { filter: { referralCode: { eq: referralCode } } },
      options: { nullable: true },
    });

    if (!parent) {
      throw new BadRequestException('Invalid referral code provided!');
    }

    // create the user profile
    const { data: user } = await this.userService.createOne({
      input: {
        ...restInput,
        referrerId: parent.id,
        status: UserStatusType.COMPLETED,
      },
    });

    // create access token
    const { data } = await this.createAccessToken({
      input: {
        reference: user.referralCode,
        platform: 'customer',
      },
    });

    return data;
  };

  /**
   * connect & sign in
   */
  signIn = async (
    input: SignInInput,
    ipAddress?: string
  ): Promise<AccessTokenDto> => {
    // check whether user exists before create access token
    const { data } = await this.userService.findOne({
      query: { filter: { username: { eq: input.username } } },
      options: { nullable: false },
    });

    // create access token
    const { data: token } = await this.createAccessToken({
      input: {
        reference: data.referralCode,
        platform: 'customer',
      },
    });
    return token;
  };

  /**
   * check whether can register
   */
  isRegisterable = async (input: SignInInput): Promise<boolean> => {
    // check whether user exists before create access token
    const { data } = await this.userService.findOne({
      query: { filter: { username: { eq: input.username } } },
      options: { nullable: true },
    });
    return !data;
  };

  /**
   * ---------------------------------
   * TWO FACTOR
   * ---------------------------------
   */
  // generate two factor from user reference
  generateTwoFactor = async (user: UserEntity) => {
    if (user.twoFactorSecret) {
      throw new BadRequestException('You already got 2FA setup!');
    }
    const reference = user.username;
    const { data } = await this.commandBus.execute(
      new GenerateTwoFactorCommand({
        input: { reference },
      })
    );
    return data;
  };

  // verify user input two factor
  verifyTwoFactor: CqrsQueryFunc<
    VerifyUser2FACodeQuery,
    VerifyUser2FACodeQuery['args']
  > = async ({ query, options }) => {
    const silence = options?.silence ?? false;
    try {
      let userData: UserEntity = null;
      // find user
      if (typeof query.user === 'number') {
        const { data: foundUser } = await this.userService.findOne({
          query: { filter: { id: { eq: query.user } } },
          options: { nullable: false },
        });
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
    user: UserEntity,
    input: BindTwoFactorInput,
    ipAddress?: string
  ): Promise<UserEntity> => {
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
      const { data } = await this.userService.updateOne({
        query: { filter: { id: { eq: user.id } } },
        input: { twoFactorSecret: input.secret },
      });
      return data.updated;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  /**
   * Request unbind 2FA
   */
  unbindTwoFactor = async (
    user: UserEntity,
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
        new UpdateOneUserCommand({
          query: { filter: { id: { eq: user.id } } },
          input: { twoFactorSecret: null },
        })
      );
      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  /**
   * ---------------------------------
   * MISCELLANEOUS
   * ---------------------------------
   */
  // create access token
  createAccessToken: CqrsCommandFunc<
    CreateAccessTokenCommand,
    CreateAccessTokenCommand['args']
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
    RefreshAccessTokenCommand,
    RefreshAccessTokenCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;

    try {
      const jwt = this.configService.get('jwt');
      const decodedToken =
        await this.jwtService.verifyAsync<AccessTokenContext>(
          input.refreshToken,
          { ignoreExpiration: false, publicKey: jwt.refreshPublicKey }
        );

      const referralCode = decodedToken.sub; // default as user referralCode (based on token)
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
      const { data: user } = await this.userService.findOne({
        query: { filter: { referralCode: { eq: referralCode } } },
        options: { relation: false, silence: true, nullable: true },
      });

      if (!user) throw new Error('Refresh token is malformed');

      // all ok, create new access token
      return this.createAccessToken({
        input: {
          reference: referralCode,
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
