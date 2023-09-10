import {
  QueryHandler,
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
} from '@nestjs/cqrs';
import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';
import { PortalUserService } from '../portal-user.service';
import {
  FindOnePortalUserQuery,
  FindManyPortalUserQuery,
  CreateOnePortalUserCommand,
  UpdateOnePortalUserCommand,
  DeleteOnePortalUserCommand,
  CountPortalUserQuery,
} from './portal-user.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
// Find one record
@QueryHandler(FindOnePortalUserQuery)
export class FindOnePortalUserQueryHandler
  implements IInferredQueryHandler<FindOnePortalUserQuery>
{
  constructor(readonly service: PortalUserService) {}
  async execute(
    query: FindOnePortalUserQuery
  ): Promise<QueryResult<FindOnePortalUserQuery>> {
    return this.service.findOne(query.args);
  }
}

// Find many records
@QueryHandler(FindManyPortalUserQuery)
export class FindManyPortalUserQueryHandler
  implements IInferredQueryHandler<FindManyPortalUserQuery>
{
  constructor(readonly service: PortalUserService) {}
  async execute(
    query: FindManyPortalUserQuery
  ): Promise<QueryResult<FindManyPortalUserQuery>> {
    return this.service.findMany(query.args);
  }
}

// Count records
@QueryHandler(CountPortalUserQuery)
export class CountPortalUserQueryHandler
  implements IInferredQueryHandler<CountPortalUserQuery>
{
  constructor(readonly service: PortalUserService) {}
  async execute(
    query: CountPortalUserQuery
  ): Promise<QueryResult<CountPortalUserQuery>> {
    return this.service.count(query.args);
  }
}

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
// Create one record
@CommandHandler(CreateOnePortalUserCommand)
export class CreateOnePortalUserCommandHandler
  implements IInferredCommandHandler<CreateOnePortalUserCommand>
{
  constructor(readonly service: PortalUserService) {}
  async execute(
    command: CreateOnePortalUserCommand
  ): Promise<CommandResult<CreateOnePortalUserCommand>> {
    return this.service.createOne(command.args);
  }
}

// Update one record
@CommandHandler(UpdateOnePortalUserCommand)
export class UpdateOnePortalUserCommandHandler
  implements IInferredCommandHandler<UpdateOnePortalUserCommand>
{
  constructor(readonly service: PortalUserService) {}
  async execute(
    command: UpdateOnePortalUserCommand
  ): Promise<CommandResult<UpdateOnePortalUserCommand>> {
    return this.service.updateOne(command.args);
  }
}

// Delete one record
@CommandHandler(DeleteOnePortalUserCommand)
export class DeleteOnePortalUserCommandHandler
  implements IInferredCommandHandler<DeleteOnePortalUserCommand>
{
  constructor(readonly service: PortalUserService) {}
  async execute(
    command: DeleteOnePortalUserCommand
  ): Promise<CommandResult<DeleteOnePortalUserCommand>> {
    return this.service.deleteOne(command.args);
  }
}
