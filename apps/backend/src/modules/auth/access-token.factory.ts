import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenIssuer } from '@apps/config/setting.config';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { AccessTokenContext } from './auth.interface';
import { AccessTokenDto } from './dto/auth.dto';

@Injectable()
export class AccessTokenFactory {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async create(ctx: AccessTokenContext): Promise<AccessTokenDto> {
    const { sub } = ctx;

    // get variables in place
    const jwt = this.configService.get<ENV['jwt']>('jwt');
    const expiresIn = jwt.tokenExpiration;
    const refreshPrivateKey = jwt.refreshPrivateKey;
    const refreshExpiresIn = jwt.refreshTokenExpiration;

    // generate access token from payload
    const accessToken = await this.jwtService.signAsync(
      { typ: 'Bearer', sub },
      { expiresIn, issuer: TokenIssuer, audience: ctx.aud }
    );

    const decodedToken: Record<string, any> = (await this.jwtService.decode(
      accessToken
    )) as unknown;
    const expiresInUnix = decodedToken.exp;

    // generate refresh token
    const refreshToken = await this.jwtService.signAsync(
      { typ: 'Refresh', sub },
      {
        expiresIn: refreshExpiresIn,
        privateKey: refreshPrivateKey,
        algorithm: 'RS256',
        issuer: TokenIssuer,
        audience: ctx.aud,
      }
    );

    const decodedRefreshToken: Record<string, any> =
      (await this.jwtService.decode(refreshToken)) as unknown;
    const expiresRefreshInUnix = decodedRefreshToken.exp;

    // construct access token payload
    return new AccessTokenDto(
      accessToken,
      expiresInUnix,
      refreshToken,
      expiresRefreshInUnix
    );
  }
}
