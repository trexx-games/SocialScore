import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { CoreConfigModule } from '@stack/server';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@apps/modules/user/user.module';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { EventHandlers, CommandHandlers, QueryHandlers } from './cqrs';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { AccessTokenFactory } from './access-token.factory';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

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
