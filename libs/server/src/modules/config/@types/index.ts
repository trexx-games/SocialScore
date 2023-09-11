import { QueueOptions } from 'bull';

import { ProjectEnvironmentConfig } from './project';

export type ConfigEnvironmentType = {
  /**
   * =============================
   * SERVER SHARED ENVIRONMENT
   * =============================
   */
  environment: string;

  // google cloud storage
  gcs?: {
    bucket: string;
    projectId: string;
    keyFilename: string;
  };

  // admin jwt
  adminJwt: {
    publicKey: string;
    privateKey: string;
    refreshPublicKey: string;
    refreshPrivateKey: string;
    tokenExpiration: string | number;
    refreshTokenExpiration: string | number;
  };

  // jwt
  jwt: {
    publicKey: string;
    privateKey: string;
    refreshPublicKey: string;
    refreshPrivateKey: string;
    tokenExpiration: string | number;
    refreshTokenExpiration: string | number;
  };

  // timed otp / secured token expiration
  timeTokenExpiration: number;
  securedTokenExpiration: number;

  // lightship configuration
  lightship?: number;

  // bull
  bull?: Omit<QueueOptions, 'createClient'>;

  // queue job timeout number
  jobTimeout: number;

  // 2FA bypass pass code
  twoFAByPassPassword?: string;

  // admin
  adminPrivateKey?: string;
  airStackPrivateKey?: string;

  /**
   * =============================
   * SERVER PROJECT ENVIRONMENT
   * =============================
   * NOTE: Add more project according project setup
   */
  backend: ProjectEnvironmentConfig;
};
