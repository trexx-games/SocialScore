import { UserEntity } from '@apps/modules/user/user.entity';

export type AccessPlatformType = 'customer' | 'portal';

/**
 * Access token context holds information that originally from token
 */
export type AccessTokenContext = {
  sub: string; // refer to unique user reference (referralCode)
  /**
   * refer to platform
   * business: refer to business owner portal
   * portal: refer to admin
   */
  aud: AccessPlatformType;
  iss: string; // issuer example default: ccgds
};

/**
 * Access token payload used for token creation
 */
export type AccessTokenPayload = {
  reference?: string; // refer to unique user reference
  platform: AccessPlatformType;
};

/**
 * Access token info holds information extracted from passport strategy (before & after)
 */
export type AccessTokenInfo = {
  user: UserEntity;
  token: AccessTokenContext;
};
