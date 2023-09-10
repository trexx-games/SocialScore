import {
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';
import { TwoFactorService } from '../two-factor.service';
import {
  GenerateTwoFactorCommand,
  VerifyTwoFactorQuery,
} from './two-factor.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
@QueryHandler(VerifyTwoFactorQuery)
export class VerifyTwoFactorQueryHandler
  implements IInferredQueryHandler<VerifyTwoFactorQuery>
{
  constructor(readonly service: TwoFactorService) {}
  async execute(
    query: VerifyTwoFactorQuery
  ): Promise<QueryResult<VerifyTwoFactorQuery>> {
    return this.service.verify(query.args);
  }
}

/**
 * ---------------------------
 * COMMAND
 * ---------------------------
 */
@CommandHandler(GenerateTwoFactorCommand)
export class GenerateTwoFactorCommandHandler
  implements IInferredCommandHandler<GenerateTwoFactorCommand>
{
  constructor(readonly service: TwoFactorService) {}
  async execute(
    command: GenerateTwoFactorCommand
  ): Promise<CommandResult<GenerateTwoFactorCommand>> {
    return this.service.generate(command.args);
  }
}

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
