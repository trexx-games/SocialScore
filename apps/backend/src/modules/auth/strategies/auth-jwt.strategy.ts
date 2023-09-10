import { QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { AccessTokenContext, AccessTokenInfo } from '../auth.interface';
import { FindOneUserQuery } from '@apps/modules/user/cqrs/user.cqrs.input';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
  constructor(
    readonly configService: ConfigService,
    readonly queryBus: QueryBus
  ) {
    const jwt = configService.get<ENV['jwt']>('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.publicKey,
      algorithms: 'RS256',
    });
  }

  async validate(context: AccessTokenContext): Promise<AccessTokenInfo> {
    const { data } = await this.queryBus.execute(
      new FindOneUserQuery({
        query: { filter: { referralCode: { eq: context.sub } } },
        options: { nullable: true, silence: true, relation: true },
      })
    );

    return {
      token: context,
      user: data,
    };
  }
}
