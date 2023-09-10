import { registerEnumType } from '@nestjs/graphql';

/**
 * USER STATUS TYPE
 */
export enum UserStatusType {
  // indicate whether use pending information (eg: referral linking)
  PENDING = 'PENDING',
  // indicate whether has setup completed
  COMPLETED = 'COMPLETED',
}
registerEnumType(UserStatusType, {
  name: 'UserStatusType',
});
