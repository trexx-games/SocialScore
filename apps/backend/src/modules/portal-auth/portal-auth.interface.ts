import { AccessTokenContext } from '@apps/modules/auth/auth.interface';
import { PortalUserType } from '@apps/modules/portal-user/portal-user.constant';
import { PortalUserEntity } from '@apps/modules/portal-user/portal-user.entity';

/**
 * Portal User Guard options
 */
export interface PortalUserGuardOptions {
  allowGuest: boolean;
}

/**
 * Portal auth role type
 */
export type PortalAuthRolesType = (keyof typeof PortalUserType)[] | '*';

/**
 * Access token info holds information extracted from passport strategy (before & after)
 */
export type AccessTokenPortalUser = {
  user: PortalUserEntity;
  token: AccessTokenContext;
};
