import { Allow } from 'class-validator';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { PortalUserStatusType, PortalUserType } from '../portal-user.constant';

// create user input
@InputType('CreatePortalUserInput')
export class CreatePortalUserInput {
  @Allow()
  @Field(() => PortalUserType)
  type?: PortalUserType;

  @Allow()
  @Field()
  username: string;

  @Allow()
  @Field()
  password: string;

  @Allow()
  @Field(() => PortalUserStatusType, { nullable: true })
  status?: PortalUserStatusType;

  twoFactorSecret?: string;

  lastLoginDate?: Date;
}

// update user input
@InputType('UpdatePortalUserInput')
export class UpdatePortalUserInput extends PartialType(CreatePortalUserInput) {}
