import { registerEnumType } from '@nestjs/graphql';

/**
 * STATUS TYPE
 */
export enum PortalUserStatusType {
  // indicate user whether is pending
  PENDING = 'PENDING',
  // indicate user whether is activated
  ACTIVATED = 'ACTIVATED',
  // indicate user whether has deactivated
  DEACTIVATED = 'DEACTIVATED',
}
registerEnumType(PortalUserStatusType, {
  name: 'PortalUserStatusType',
});

/**
 * USER TYPE
 */
export enum PortalUserType {
  DIRECTOR = 'DIRECTOR',
  MANAGER = 'MANAGER',
  SUPERVISOR = 'SUPERVISOR',
}

registerEnumType(PortalUserType, {
  name: 'PortalUserType',
});
