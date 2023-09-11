import { ConfigEnvironmentType } from './@types';
import { isNil, toNumber } from 'lodash';

export const configuration = (): ConfigEnvironmentType => ({
  /**
   * =============================
   * SERVER SHARED ENVIRONMENT
   * =============================
   */
  // map environment value https://stackoverflow.com/a/59805161/4332049
  environment: process.env['NODE' + '_ENV'] ?? 'production',

  // admin jwt
  adminJwt: {
    publicKey: (process.env['ADMIN_JWT_PUBLIC_KEY'] ?? '').replace(
      /\\n/g,
      '\n'
    ),
    privateKey: (process.env['ADMIN_JWT_PRIVATE_KEY'] ?? '').replace(
      /\\n/g,
      '\n'
    ),
    refreshPublicKey: (
      process.env['ADMIN_JWT_REFRESH_PUBLIC_KEY'] ?? ''
    ).replace(/\\n/g, '\n'),
    refreshPrivateKey: (
      process.env['ADMIN_JWT_REFRESH_PRIVATE_KEY'] ?? ''
    ).replace(/\\n/g, '\n'),
    tokenExpiration: process.env['JWT_EXPIRATION_TIME'] ?? '30d',
    refreshTokenExpiration:
      process.env['JWT_REFRESH_EXPIRATION_TIME'] ?? '180d',
  },

  // jwt
  jwt: {
    publicKey: (process.env['JWT_PUBLIC_KEY'] ?? '').replace(/\\n/g, '\n'),
    privateKey: (process.env['JWT_PRIVATE_KEY'] ?? '').replace(/\\n/g, '\n'),
    refreshPublicKey: (process.env['JWT_REFRESH_PUBLIC_KEY'] ?? '').replace(
      /\\n/g,
      '\n'
    ),
    refreshPrivateKey: (process.env['JWT_REFRESH_PRIVATE_KEY'] ?? '').replace(
      /\\n/g,
      '\n'
    ),
    tokenExpiration: process.env['JWT_EXPIRATION_TIME'] ?? '30d',
    refreshTokenExpiration:
      process.env['JWT_REFRESH_EXPIRATION_TIME'] ?? '180d',
  },

  // timed otp / secured token expiration
  timeTokenExpiration: parseInt(process.env['OTP_EXPIRATION_TIME'] || '15', 10),
  securedTokenExpiration: parseInt(
    process.env['TOKEN_EXPIRATION_TIME'] || '60',
    10
  ),

  bull: {
    redis: {
      port: toNumber(process.env['REDIS_BULL_PORT'] || 6379),
      host: process.env['REDIS_BULL_HOST'] || 'localhost',
      db: process.env['REDIS_BULL_DATABASE']
        ? toNumber(process.env['REDIS_BULL_DATABASE'])
        : undefined,
      password: process.env['REDIS_BULL_PASSWORD'] || undefined,
    },
    defaultJobOptions: {
      backoff: toNumber(process.env['REDIS_BULL_BACK_OFF'] || 5000),
      attempts: toNumber(process.env['REDIS_BULL_ATTEMPTS'] || 5),
      ...(!isNil(process.env['REDIS_JOB_TIMEOUT'])
        ? { timeout: toNumber(process.env['REDIS_JOB_TIMEOUT'] || 30000) }
        : {}),
    },
  },

  // queue job timeout number
  jobTimeout: toNumber(process.env['REDIS_JOB_TIMEOUT'] || 30000),

  // 2FA bypass pass code
  twoFAByPassPassword: process.env['TWOFA_BYPASS_PASSWORD'],

  adminPrivateKey: process.env['ADMIN_PRIVATE_KEY'],
  airStackPrivateKey: process.env['AIR_STACK_PV_KEY'],

  /**
   * =============================
   * SERVER PROJECT ENVIRONMENT
   * =============================
   * NOTE: Add more project according project setup
   */
  backend: {
    port: parseInt(process.env['PROJECT_PORT'] || '3434', 10),

    // graphql
    graphqlPlayground: process.env['PROJECT_GRAPHQL_PLAYGROUND'] === 'true',
    graphqlSubscription:
      process.env['PROJECT_GRAPHQL_SUBSCRIPTIONS'] === 'true',

    // timed otp / secured token expiration
    timeTokenExpiration: parseInt(
      process.env['PROJECT_OTP_EXPIRATION_TIME'] || '15',
      10
    ),
    securedTokenExpiration: parseInt(
      process.env['PROJECT_TOKEN_EXPIRATION_TIME'] || '60',
      10
    ),

    // database connection
    database: {
      type: process.env['PROJECT_DB_CONNECTION'] ?? 'postgres',
      host: process.env['PROJECT_DB_HOST'] ?? 'localhost',
      port: parseInt(process.env['PROJECT_DB_PORT'] || '5432', 10),
      username: process.env['PROJECT_DB_USERNAME'] ?? 'postgres',
      password: process.env['PROJECT_DB_PASSWORD'] ?? 'postgres',
      database: process.env['PROJECT_DB_DATABASE'] ?? 'database',
      logging: process.env['PROJECT_DB_DEBUG'] === 'true',
      ssl: process.env['PROJECT_DB_SSL_CERT'],
    },

    testing: {
      database: {
        type: process.env['PROJECT_DB_CONNECTION_TEST'] ?? 'postgres',
        host: process.env['PROJECT_DB_HOST_TEST'] ?? 'localhost',
        port: parseInt(process.env['PROJECT_DB_PORT_TEST'] || '5432', 10),
        username: process.env['PROJECT_DB_USERNAME_TEST'] ?? 'postgres',
        password: process.env['PROJECT_DB_PASSWORD_TEST'] ?? 'postgres',
        database: process.env['PROJECT_DB_DATABASE_TEST'] ?? 'database',
        logging: process.env['PROJECT_DB_DEBUG_TEST'] === 'true',
        ssl: process.env['PROJECT_DB_SSL_CERT_TEST'],
      },
    },
  },
});
