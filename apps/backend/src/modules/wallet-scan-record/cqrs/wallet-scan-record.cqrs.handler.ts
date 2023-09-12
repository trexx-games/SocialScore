import {
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';

import { WalletScanRecordService } from '../wallet-scan-record.service';

import {
  CountWalletScanRecordQuery,
  CreateOneWalletScanRecordCommand,
  DeleteOneWalletScanRecordCommand,
  FindManyWalletScanRecordQuery,
  FindOneWalletScanRecordQuery,
  UpdateOneWalletScanRecordCommand,
} from './wallet-scan-record.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
// Find one record
@QueryHandler(FindOneWalletScanRecordQuery)
export class FindOneWalletScanRecordQueryHandler
  implements IInferredQueryHandler<FindOneWalletScanRecordQuery>
{
  constructor(readonly service: WalletScanRecordService) {}
  async execute(
    query: FindOneWalletScanRecordQuery
  ): Promise<QueryResult<FindOneWalletScanRecordQuery>> {
    return this.service.findOne(query.args);
  }
}

// Find many records
@QueryHandler(FindManyWalletScanRecordQuery)
export class FindManyWalletScanRecordQueryHandler
  implements IInferredQueryHandler<FindManyWalletScanRecordQuery>
{
  constructor(readonly service: WalletScanRecordService) {}
  async execute(
    query: FindManyWalletScanRecordQuery
  ): Promise<QueryResult<FindManyWalletScanRecordQuery>> {
    return this.service.findMany(query.args);
  }
}

// count records
@QueryHandler(CountWalletScanRecordQuery)
export class CountWalletScanRecordQueryHandler
  implements IInferredQueryHandler<CountWalletScanRecordQuery>
{
  constructor(readonly service: WalletScanRecordService) {}
  async execute(
    query: CountWalletScanRecordQuery
  ): Promise<QueryResult<CountWalletScanRecordQuery>> {
    return this.service.count(query.args);
  }
}

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
// Create one record
@CommandHandler(CreateOneWalletScanRecordCommand)
export class CreateOneWalletScanRecordCommandHandler
  implements IInferredCommandHandler<CreateOneWalletScanRecordCommand>
{
  constructor(readonly service: WalletScanRecordService) {}
  async execute(
    command: CreateOneWalletScanRecordCommand
  ): Promise<CommandResult<CreateOneWalletScanRecordCommand>> {
    return this.service.createOne(command.args);
  }
}

// Update one record
@CommandHandler(UpdateOneWalletScanRecordCommand)
export class UpdateOneWalletScanRecordCommandHandler
  implements IInferredCommandHandler<UpdateOneWalletScanRecordCommand>
{
  constructor(readonly service: WalletScanRecordService) {}
  async execute(
    command: UpdateOneWalletScanRecordCommand
  ): Promise<CommandResult<UpdateOneWalletScanRecordCommand>> {
    return this.service.updateOne(command.args);
  }
}

// Delete one record
@CommandHandler(DeleteOneWalletScanRecordCommand)
export class DeleteOneWalletScanRecordCommandHandler
  implements IInferredCommandHandler<DeleteOneWalletScanRecordCommand>
{
  constructor(readonly service: WalletScanRecordService) {}
  async execute(
    command: DeleteOneWalletScanRecordCommand
  ): Promise<CommandResult<DeleteOneWalletScanRecordCommand>> {
    return this.service.deleteOne(command.args);
  }
}
