import { QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenContext } from '@apps/modules/auth/auth.interface';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { FindOnePortalUserQuery } from '@apps/modules/portal-user/cqrs/portal-user.cqrs.input';
import { AccessTokenPortalUser } from '../portal-auth.interface';

@Injectable()
export class PortalAuthJwtStrategy extends PassportStrategy(
  Strategy,
  'portal-jwt'
) {
  constructor(
    readonly configService: ConfigService,
    readonly queryBus: QueryBus
  ) {
    const jwt = configService.get<ENV['adminJwt']>('adminJwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.publicKey,
      algorithms: 'RS256',
    });
  }

  async validate(context: AccessTokenContext): Promise<AccessTokenPortalUser> {
    const { data } = await this.queryBus.execute(
      new FindOnePortalUserQuery({
        query: { filter: { reference: { eq: context.sub } } },
        options: { nullable: true, silence: true, relation: true },
      })
    );
    return {
      token: context,
      user: data,
    };
  }
}
