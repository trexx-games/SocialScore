import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';
import {
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { AuthService } from '../auth.service';
import {
  CreateAccessTokenCommand,
  RefreshAccessTokenCommand,
  VerifyUser2FACodeQuery,
} from './auth.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
@QueryHandler(VerifyUser2FACodeQuery)
export class VerifyUser2FACodeQueryHandler
  implements IInferredQueryHandler<VerifyUser2FACodeQuery>
{
  constructor(readonly service: AuthService) {}

  async execute(
    command: VerifyUser2FACodeQuery
  ): Promise<QueryResult<VerifyUser2FACodeQuery>> {
    return this.service.verifyTwoFactor(command.args);
  }
}

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
