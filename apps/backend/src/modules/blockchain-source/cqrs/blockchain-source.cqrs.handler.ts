import {
  QueryHandler,
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
} from '@nestjs/cqrs';
import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';
import { BlockchainSourceService } from '../blockchain-source.service';
import {
  FindOneBlockchainSourceQuery,
  FindManyBlockchainSourceQuery,
  CreateOneBlockchainSourceCommand,
  UpdateOneBlockchainSourceCommand,
  DeleteOneBlockchainSourceCommand,
  CountBlockchainSourceQuery,
} from './blockchain-source.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
// Find one record
@QueryHandler(FindOneBlockchainSourceQuery)
export class FindOneBlockchainSourceQueryHandler
  implements IInferredQueryHandler<FindOneBlockchainSourceQuery>
{
  constructor(readonly service: BlockchainSourceService) {}
  async execute(
    query: FindOneBlockchainSourceQuery
  ): Promise<QueryResult<FindOneBlockchainSourceQuery>> {
    return this.service.findOne(query.args);
  }
}

// Find many records
@QueryHandler(FindManyBlockchainSourceQuery)
export class FindManyBlockchainSourceQueryHandler
  implements IInferredQueryHandler<FindManyBlockchainSourceQuery>
{
  constructor(readonly service: BlockchainSourceService) {}
  async execute(
    query: FindManyBlockchainSourceQuery
  ): Promise<QueryResult<FindManyBlockchainSourceQuery>> {
    return this.service.findMany(query.args);
  }
}

// count records
@QueryHandler(CountBlockchainSourceQuery)
export class CountBlockchainSourceQueryHandler
  implements IInferredQueryHandler<CountBlockchainSourceQuery>
{
  constructor(readonly service: BlockchainSourceService) {}
  async execute(
    query: CountBlockchainSourceQuery
  ): Promise<QueryResult<CountBlockchainSourceQuery>> {
    return this.service.count(query.args);
  }
}

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
// Create one record
@CommandHandler(CreateOneBlockchainSourceCommand)
export class CreateOneBlockchainSourceCommandHandler
  implements IInferredCommandHandler<CreateOneBlockchainSourceCommand>
{
  constructor(readonly service: BlockchainSourceService) {}
  async execute(
    command: CreateOneBlockchainSourceCommand
  ): Promise<CommandResult<CreateOneBlockchainSourceCommand>> {
    return this.service.createOne(command.args);
  }
}

// Update one record
@CommandHandler(UpdateOneBlockchainSourceCommand)
export class UpdateOneBlockchainSourceCommandHandler
  implements IInferredCommandHandler<UpdateOneBlockchainSourceCommand>
{
  constructor(readonly service: BlockchainSourceService) {}
  async execute(
    command: UpdateOneBlockchainSourceCommand
  ): Promise<CommandResult<UpdateOneBlockchainSourceCommand>> {
    return this.service.updateOne(command.args);
  }
}

// Delete one record
@CommandHandler(DeleteOneBlockchainSourceCommand)
export class DeleteOneBlockchainSourceCommandHandler
  implements IInferredCommandHandler<DeleteOneBlockchainSourceCommand>
{
  constructor(readonly service: BlockchainSourceService) {}
  async execute(
    command: DeleteOneBlockchainSourceCommand
  ): Promise<CommandResult<DeleteOneBlockchainSourceCommand>> {
    return this.service.deleteOne(command.args);
  }
}
