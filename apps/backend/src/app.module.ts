import { PROJECT_FOLDER } from '@apps/config/constant';
import { AuthModule } from '@apps/modules/auth/auth.module';
import { QueueModule } from '@apps/modules/queue/queue.module';
import { TwoFactorModule } from '@apps/modules/two-factor/two-factor.module';
import { UserModule } from '@apps/modules/user/user.module';
import { UtilsModule } from '@apps/modules/utils/utils.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEnvironmentType as ENV, CoreConfigModule } from '@stack/server';
import GraphQLJSON from 'graphql-type-json';
import { SnakeNamingStrategy } from 'nestjs-dev-utilities';
import { join } from 'path';

import { AirstackModule } from './modules/airstack/airstack.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { BlockchainScanModule } from './modules/blockchain-scan/blockchain-scan.module';
import { BlockchainSourceModule } from './modules/blockchain-source/blockchain-source.module';
import { WalletModule } from './modules/wallet/wallet.module';

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
    QueueModule,
    AuthModule,
    UserModule,
    AirstackModule,
    BlockchainScanModule,
    BlockchainModule,
    BlockchainSourceModule,
    WalletModule,
  ],
})
export class AppModule {}
