import { PartialType } from '@nestjs/graphql';
import { UserStatusType } from '../user.constant';

// create user input
export class CreateUserInput {
  firstName: string;
  lastName: string;
  username: string;
  referrerId?: number;
  status?: UserStatusType;
  twoFactorSecret?: string;
}

// update user input
export class UpdateUserInput extends PartialType(CreateUserInput) {}
