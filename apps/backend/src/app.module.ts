import { BlockchainScanModule } from './modules/blockchain-scan/blockchain-scan.module';
import { join } from 'path';
import GraphQLJSON from 'graphql-type-json';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CoreConfigModule, ConfigEnvironmentType as ENV } from '@stack/server';
import { UtilsModule } from '@apps/modules/utils/utils.module';
import { UserModule } from '@apps/modules/user/user.module';
import { AuthModule } from '@apps/modules/auth/auth.module';
import { TwoFactorModule } from '@apps/modules/two-factor/two-factor.module';
import { PROJECT_FOLDER } from '@apps/config/constant';
import { PortalUserModule } from '@apps/modules/portal-user/portal-user.module';
import { PortalAuthModule } from '@apps/modules/portal-auth/portal-auth.module';
import { QueueModule } from '@apps/modules/queue/queue.module';
import { SnakeNamingStrategy } from 'nestjs-dev-utilities';
import { AirstackModule } from './modules/airstack/airstack.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CoreConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ENV>) => {
        const isEnvTest = configService.get('environment') === 'test';
        const config = configService.get<ENV['backend']>('backend');
        const database = !isEnvTest ? config.database : config.testing.database;

        return {
          type: 'postgres',
          host: database.host,
          port: database.port ?? 5432,
          username: database.username,
          password: database.password,
          database: database.database,
          ssl: database.ssl
            ? {
                rejectUnauthorized: false,
                ca: database.ssl,
              }
            : false,
          migrations: [`${__dirname}/migrations/*.js`],
          migrationsRun: true,
          namingStrategy: new SnakeNamingStrategy(),
          logging: database.logging,
          autoLoadEntities: true,
          keepConnectionAlive: true,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      fieldResolverEnhancers: ['guards', 'interceptors'],
      autoSchemaFile: join(process.cwd(), `apps/${PROJECT_FOLDER}/schema.gql`),
      resolvers: { JSON: GraphQLJSON },
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    BullModule.forRootAsync({
      imports: [CoreConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<ENV>) => {
        return configService.get('bull');
      },
    }),
    ScheduleModule.forRoot(),
    CqrsModule,
    CoreConfigModule,
    UtilsModule,
    TwoFactorModule,
    PortalUserModule,
    PortalAuthModule,
    QueueModule,
    AuthModule,
    UserModule,
    AirstackModule,
    BlockchainScanModule,
  ],
})
export class AppModule {}
