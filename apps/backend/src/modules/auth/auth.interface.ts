import { UserEntity } from '@apps/modules/user/user.entity';

/**
 * Access token context holds information that originally from token
 */
export type AccessTokenContext = {
  sub: string; // refer to unique user reference (address)
  iss: string; // issuer
};

/**
 * Access token payload used for token creation
 */
export type AccessTokenPayload = {
  reference?: string; // refer to unique user reference (address)
};

/**
 * Access token info holds information extracted from passport strategy (before & after)
 */
export type AccessTokenInfo = {
  user: UserEntity;
  token: AccessTokenContext;
};
