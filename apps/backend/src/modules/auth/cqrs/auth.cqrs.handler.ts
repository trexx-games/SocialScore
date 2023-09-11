import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { CommandResult } from '@nestjs-architects/typed-cqrs';

import { AuthService } from '../auth.service';

import {
  CreateAccessTokenCommand,
  RefreshAccessTokenCommand,
} from './auth.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
// create access token
@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenCommandHandler
  implements IInferredCommandHandler<CreateAccessTokenCommand>
{
  constructor(readonly service: AuthService) {}

  async execute(
    command: CreateAccessTokenCommand
  ): Promise<CommandResult<CreateAccessTokenCommand>> {
    return this.service.createAccessToken(command.args);
  }
}

// refresh access token
@CommandHandler(RefreshAccessTokenCommand)
export class RefreshAccessTokenCommandHandler
  implements IInferredCommandHandler<RefreshAccessTokenCommand>
{
  constructor(readonly service: AuthService) {}

  async execute(
    command: RefreshAccessTokenCommand
  ): Promise<CommandResult<RefreshAccessTokenCommand>> {
    return this.service.refreshAccessToken(command.args);
  }
}
