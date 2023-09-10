import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { TWO_FACTOR_APP_NAME } from '@apps/config/constant';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import {
  GenerateTwoFactorCommand,
  VerifyTwoFactorQuery,
} from './cqrs/two-factor.cqrs.input';

@Injectable()
export class TwoFactorService {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly config: ConfigService<ENV>
  ) {}

  /**
   * Verify is 2FA code matched
   */
  verify: CqrsQueryFunc<VerifyTwoFactorQuery, VerifyTwoFactorQuery['args']> =
    async ({ query, options }) => {
      const silence = options?.silence ?? false;
      try {
        // if there is env bypasss
        if (this.config.get('twoFAByPassPassword')) {
          if (query.code === this.config.get('twoFAByPassPassword')) {
            return { success: true, data: true };
          }
        }

        const validCode = authenticator.verify({
          token: query.code,
          secret: query.secret,
        });

        if (!validCode) {
          throw new Error('2FA code cannot be verified!');
        }
        return { success: true, data: true };
      } catch (e) {
        if (!silence) throw new BadRequestException(e);
        return { success: false, message: e.message, data: false };
      }
    };

  /**
   * generate 2FA Connection
   */
  generate: CqrsCommandFunc<
    GenerateTwoFactorCommand,
    GenerateTwoFactorCommand['args']
  > = async ({ input, options }) => {
    const title = input?.title ?? TWO_FACTOR_APP_NAME;
    const reference = input.reference;
    const silence = options?.silence ?? false;
    try {
      const secret = authenticator.generateSecret();
      const keyUri = authenticator.keyuri(reference, title, secret);
      const output = await toDataURL(keyUri);

      return {
        success: true,
        data: {
          secret,
          output,
        },
      };
    } catch (e) {
      if (!silence) throw new BadRequestException(e);
      return { success: false, message: e.message };
    }
  };
}
