import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PROJECT_NAME } from '@apps/config/constant';
import { NestFactory, Reflector } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from 'nestjs-dev-utilities';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { RequestHeaderPlatformInterceptor } from '@apps/interceptors/request-headers-platform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<ENV>>(ConfigService);

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new RequestHeaderPlatformInterceptor(
      reflector,
      app.get<JwtService>(JwtService)
    )
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    })
  );

  const port = config.get('backend').port || 3434;
  app.enableCors({
    allowedHeaders: '*',
  });

  await app.listen(port);

  Logger.log(`🚀 ${PROJECT_NAME} is running on: http://localhost:${port}}`);
}

bootstrap();
