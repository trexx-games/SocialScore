import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UtilsModule } from '@apps/modules/utils/utils.module';
import { CoreConfigModule, ConfigEnvironmentType as ENV } from '@stack/server';
import { AnonymousStrategy } from '@apps/modules/auth/strategies/anonymous.strategy';
import { PortalAuthJwtStrategy } from './strategies/portal-auth-jwt.strategy';
import { EventHandlers, CommandHandlers, QueryHandlers } from './cqrs';
import { PortalAuthAccessTokenFactory } from './portal-auth.factory';
import { PortalAuthResolver } from './portal-auth.resolver';
import { PortalAuthService } from './portal-auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [CoreConfigModule],
      useFactory: (configService: ConfigService) => {
        const jwt = configService.get<ENV['adminJwt']>('adminJwt');
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
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    CqrsModule,
    UtilsModule,
  ],
  providers: [
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    PortalAuthService,
    PortalAuthJwtStrategy,
    AnonymousStrategy,
    PortalAuthAccessTokenFactory,
    PortalAuthResolver,
  ],
  // controllers: [PortalAuthController],
  exports: [PortalAuthService],
})
export class PortalAuthModule {}
