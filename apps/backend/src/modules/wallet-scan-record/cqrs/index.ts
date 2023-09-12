import {
  CountWalletScanRecordQueryHandler,
  CreateOneWalletScanRecordCommandHandler,
  DeleteOneWalletScanRecordCommandHandler,
  FindManyWalletScanRecordQueryHandler,
  FindOneWalletScanRecordQueryHandler,
  UpdateOneWalletScanRecordCommandHandler,
} from './wallet-scan-record.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [
  FindOneWalletScanRecordQueryHandler,
  FindManyWalletScanRecordQueryHandler,
  CountWalletScanRecordQueryHandler,
];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [
  CreateOneWalletScanRecordCommandHandler,
  UpdateOneWalletScanRecordCommandHandler,
  DeleteOneWalletScanRecordCommandHandler,
];

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
export const EventHandlers = [];

/**
 * ---------------------------
 * EXPORT
 * ---------------------------
 */
export * from './wallet-scan-record.cqrs.input';
