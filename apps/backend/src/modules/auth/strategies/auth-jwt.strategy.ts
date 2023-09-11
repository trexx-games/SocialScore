import { FindOneUserQuery } from '@apps/modules/user/cqrs/user.cqrs.input';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AccessTokenContext, AccessTokenInfo } from '../auth.interface';

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
        query: { filter: { address: { eq: context.sub } } },
        options: { nullable: true, silence: true, relation: true },
      })
    );

    return {
      token: context,
      user: data,
    };
  }
}
