import { UserModule } from '@apps/modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CoreConfigModule } from '@stack/server';
import { ConfigEnvironmentType as ENV } from '@stack/server';

import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { AccessTokenFactory } from './access-token.factory';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [CoreConfigModule],
      useFactory: (configService: ConfigService) => {
        const jwt = configService.get<ENV['jwt']>('jwt');
        return {
          publicKey: jwt.publicKey,
          privateKey: jwt.privateKey,
          signOptions: {
            expiresIn: jwt.tokenExpiration,
            algorithm: 'RS256',
          },
        };
      },
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'auth-jwt' }),
    CqrsModule,
    UserModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    AuthService,
    AuthResolver,
    AuthJwtStrategy,
    AnonymousStrategy,
    AccessTokenFactory,
  ],
})
export class AuthModule {}
