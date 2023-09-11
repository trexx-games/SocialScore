import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'nestjs-dev-utilities';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config({
  path: `../../.env`,
});

const config = {
  type: (process.env.PROJECT_DB_CONNECTION ??
    'postgres') as PostgresConnectionOptions['type'],
  host: process.env.PROJECT_DB_HOST,
  port: parseInt(`${process.env?.PROJECT_DB_PORT ?? '5432'}`),
  username: process.env.PROJECT_DB_USERNAME,
  password: process.env.PROJECT_DB_PASSWORD,
  database: process.env.PROJECT_DB_DATABASE,
  ssl: process.env.PROJECT_DB_SSL_CERT
    ? {
        rejectUnauthorized: true,
        ca: process.env.PROJECT_DB_SSL_CERT,
      }
    : false,
  entities: [__dirname + '/src/modules/**/*.entity.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['src/migrations/*{.ts,.js}'],
  seeds: ['src/seeders/**.seeder{.ts,.js}'],
  cli: {
    migrationsDir: 'apps/backend/src/migrations',
  },
};

export default new DataSource(config);
