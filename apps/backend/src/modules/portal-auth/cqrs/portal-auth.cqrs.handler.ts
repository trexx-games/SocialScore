import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';
import {
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { PortalAuthService } from '../portal-auth.service';
import {
  CreatePortalAccessTokenCommand,
  RefreshPortalAccessTokenCommand,
  VerifyPortalUser2FACodeQuery,
} from './portal-auth.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
@QueryHandler(VerifyPortalUser2FACodeQuery)
export class VerifyPortalUser2FACodeQueryHandler
  implements IInferredQueryHandler<VerifyPortalUser2FACodeQuery>
{
  constructor(readonly service: PortalAuthService) {}

  async execute(
    command: VerifyPortalUser2FACodeQuery
  ): Promise<QueryResult<VerifyPortalUser2FACodeQuery>> {
    return this.service.verifyTwoFactor(command.args);
  }
}

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
// create access token
@CommandHandler(CreatePortalAccessTokenCommand)
export class CreatePortalAccessTokenCommandHandler
  implements IInferredCommandHandler<CreatePortalAccessTokenCommand>
{
  constructor(readonly service: PortalAuthService) {}

  async execute(
    command: CreatePortalAccessTokenCommand
  ): Promise<CommandResult<CreatePortalAccessTokenCommand>> {
    return this.service.createAccessToken(command.args);
  }
}

// refresh access token
@CommandHandler(RefreshPortalAccessTokenCommand)
export class RefreshPortalAccessTokenCommandHandler
  implements IInferredCommandHandler<RefreshPortalAccessTokenCommand>
{
  constructor(readonly service: PortalAuthService) {}

  async execute(
    command: RefreshPortalAccessTokenCommand
  ): Promise<CommandResult<RefreshPortalAccessTokenCommand>> {
    return this.service.refreshAccessToken(command.args);
  }
}
