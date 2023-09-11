import { PROJECT_NAME } from '@apps/config/constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { LoggingInterceptor } from 'nestjs-dev-utilities';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<ENV>>(ConfigService);

  app.useGlobalInterceptors(new LoggingInterceptor());

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
