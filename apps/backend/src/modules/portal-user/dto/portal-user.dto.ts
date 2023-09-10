import { AbstractDto } from 'nestjs-dev-utilities';
import { Field, ObjectType } from '@nestjs/graphql';
import { PortalUserStatusType, PortalUserType } from '../portal-user.constant';

@ObjectType('PortalUser')
export class PortalUserDto extends AbstractDto {
  @Field(() => PortalUserType)
  type: PortalUserType;

  @Field()
  reference: string;

  @Field()
  username: string;

  password: string;

  @Field(() => PortalUserStatusType)
  status: PortalUserStatusType;

  twoFactorSecret?: string;

  @Field({ nullable: true })
  lastLoginDate?: Date;
}
