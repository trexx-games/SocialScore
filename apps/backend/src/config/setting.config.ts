import { AccessPlatformType } from '@apps/modules/auth/auth.interface';

/**
 * The alphabet that used to generated referral code
 */
export const ReferralAlphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const ReferenceAlphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * The token issuer name
 */
export const TokenIssuer = 'huat';

/**
 * REQUEST HEADER KEY (PLATFORM = business, portal)
 */
export const HEADER_PLATFORM_KEY = 'x-huat-platform';

/**
 * Allowed audience for the system
 */
export const ALLOWED_PLATFORM: AccessPlatformType[] = ['customer', 'portal'];
