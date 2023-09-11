import {
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';

import { UserService } from '../user.service';

import {
  CountUserQuery,
  CreateOneUserCommand,
  DeleteOneUserCommand,
  FindManyUserQuery,
  FindOneUserQuery,
  UpdateOneUserCommand,
} from './user.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
// Find one record
@QueryHandler(FindOneUserQuery)
export class FindOneUserQueryHandler
  implements IInferredQueryHandler<FindOneUserQuery>
{
  constructor(readonly service: UserService) {}
  async execute(
    query: FindOneUserQuery
  ): Promise<QueryResult<FindOneUserQuery>> {
    return this.service.findOne(query.args);
  }
}

// Find many records
@QueryHandler(FindManyUserQuery)
export class FindManyUserQueryHandler
  implements IInferredQueryHandler<FindManyUserQuery>
{
  constructor(readonly service: UserService) {}
  async execute(
    query: FindManyUserQuery
  ): Promise<QueryResult<FindManyUserQuery>> {
    return this.service.findMany(query.args);
  }
}

// count records
@QueryHandler(CountUserQuery)
export class CountUserQueryHandler
  implements IInferredQueryHandler<CountUserQuery>
{
  constructor(readonly service: UserService) {}
  async execute(query: CountUserQuery): Promise<QueryResult<CountUserQuery>> {
    return this.service.count(query.args);
  }
}

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
// Create one record
@CommandHandler(CreateOneUserCommand)
export class CreateOneUserCommandHandler
  implements IInferredCommandHandler<CreateOneUserCommand>
{
  constructor(readonly service: UserService) {}
  async execute(
    command: CreateOneUserCommand
  ): Promise<CommandResult<CreateOneUserCommand>> {
    return this.service.createOne(command.args);
  }
}

// Update one record
@CommandHandler(UpdateOneUserCommand)
export class UpdateOneUserCommandHandler
  implements IInferredCommandHandler<UpdateOneUserCommand>
{
  constructor(readonly service: UserService) {}
  async execute(
    command: UpdateOneUserCommand
  ): Promise<CommandResult<UpdateOneUserCommand>> {
    return this.service.updateOne(command.args);
  }
}

// Delete one record
@CommandHandler(DeleteOneUserCommand)
export class DeleteOneUserCommandHandler
  implements IInferredCommandHandler<DeleteOneUserCommand>
{
  constructor(readonly service: UserService) {}
  async execute(
    command: DeleteOneUserCommand
  ): Promise<CommandResult<DeleteOneUserCommand>> {
    return this.service.deleteOne(command.args);
  }
}
