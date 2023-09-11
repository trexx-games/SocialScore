import { PartialType } from '@nestjs/graphql';

// create user input
export class CreateUserInput {
  address: string;
  username?: string;
  lastSyncDate?: Date;
}

// update user input
export class UpdateUserInput extends PartialType(CreateUserInput) {}
