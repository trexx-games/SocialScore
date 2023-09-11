import {
  QueryHandler,
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
} from '@nestjs/cqrs';
import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';
import { WalletService } from '../wallet.service';
import {
  FindOneWalletQuery,
  FindManyWalletQuery,
  CreateOneWalletCommand,
  UpdateOneWalletCommand,
  DeleteOneWalletCommand,
  CountWalletQuery,
} from './wallet.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
// Find one record
@QueryHandler(FindOneWalletQuery)
export class FindOneWalletQueryHandler
  implements IInferredQueryHandler<FindOneWalletQuery>
{
  constructor(readonly service: WalletService) {}
  async execute(
    query: FindOneWalletQuery
  ): Promise<QueryResult<FindOneWalletQuery>> {
    return this.service.findOne(query.args);
  }
}

// Find many records
@QueryHandler(FindManyWalletQuery)
export class FindManyWalletQueryHandler
  implements IInferredQueryHandler<FindManyWalletQuery>
{
  constructor(readonly service: WalletService) {}
  async execute(
    query: FindManyWalletQuery
  ): Promise<QueryResult<FindManyWalletQuery>> {
    return this.service.findMany(query.args);
  }
}

// count records
@QueryHandler(CountWalletQuery)
export class CountWalletQueryHandler
  implements IInferredQueryHandler<CountWalletQuery>
{
  constructor(readonly service: WalletService) {}
  async execute(
    query: CountWalletQuery
  ): Promise<QueryResult<CountWalletQuery>> {
    return this.service.count(query.args);
  }
}

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
// Create one record
@CommandHandler(CreateOneWalletCommand)
export class CreateOneWalletCommandHandler
  implements IInferredCommandHandler<CreateOneWalletCommand>
{
  constructor(readonly service: WalletService) {}
  async execute(
    command: CreateOneWalletCommand
  ): Promise<CommandResult<CreateOneWalletCommand>> {
    return this.service.createOne(command.args);
  }
}

// Update one record
@CommandHandler(UpdateOneWalletCommand)
export class UpdateOneWalletCommandHandler
  implements IInferredCommandHandler<UpdateOneWalletCommand>
{
  constructor(readonly service: WalletService) {}
  async execute(
    command: UpdateOneWalletCommand
  ): Promise<CommandResult<UpdateOneWalletCommand>> {
    return this.service.updateOne(command.args);
  }
}

// Delete one record
@CommandHandler(DeleteOneWalletCommand)
export class DeleteOneWalletCommandHandler
  implements IInferredCommandHandler<DeleteOneWalletCommand>
{
  constructor(readonly service: WalletService) {}
  async execute(
    command: DeleteOneWalletCommand
  ): Promise<CommandResult<DeleteOneWalletCommand>> {
    return this.service.deleteOne(command.args);
  }
}
