import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenExpiredError } from 'jsonwebtoken';
import { TOKEN_ISSUER } from '@apps/config/constant';
import { CqrsCommandFunc } from 'nestjs-typed-cqrs';
import { UserService } from '@apps/modules/user/user.service';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { AccessTokenFactory } from './access-token.factory';
import { AccessTokenContext } from './auth.interface';
import { AccessTokenDto } from './dto/auth.dto';
import {
  CreateAccessTokenCommand,
  RefreshAccessTokenCommand,
} from './cqrs/auth.cqrs.input';
import { ConnectInput } from './dto/auth.input';
import { BlockchainVerifySignerMessageQuery } from '../blockchain/cqrs';

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
   * Connect smart wallet
   */
  connect = async (input: ConnectInput): Promise<AccessTokenDto> => {
    try {
      const { address, signature, message } = input;

      // verify the signer message
      const { data: signer } = await this.queryBus.execute(
        new BlockchainVerifySignerMessageQuery({
          query: { signature, message },
        })
      );

      if (signer !== address) {
        throw new Error("Signer couldn't verified!");
      }

      // check whether this user has register before
      const { data: found } = await this.userService.findOne({
        query: { filter: { address: { eq: `${address}` } } },
        options: { nullable: true },
      });

      // create the user profile if address not in system
      if (!found) {
        const { data: user } = await this.userService.createOne({
          input: {
            address: input.address,
            username: input.username,
          },
        });

        const { data: accessToken } = await this.createAccessToken({
          input: { reference: user.address },
        });
        return accessToken;
      }

      // create access token for found user
      const { data } = await this.createAccessToken({
        input: { reference: found.address },
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
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
        iss: TOKEN_ISSUER,
        sub: input.reference,
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

      const username = decodedToken.sub; // default as user wallet address (based on token)
      const defaultIssuer = decodedToken.iss; // default token issuer (based on token)

      // check if refresh token is issued by TokenIssuer
      if (defaultIssuer !== TOKEN_ISSUER) {
        throw new Error('Issuer not allowed');
      }

      // find user account info based on token payload "sub"
      const { data: user } = await this.userService.findOne({
        query: { filter: { username: { eq: username } } },
        options: { relation: false, silence: true, nullable: true },
      });

      if (!user) throw new Error('Refresh token is malformed');

      // all ok, create new access token
      return this.createAccessToken({
        input: {
          reference: username,
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
