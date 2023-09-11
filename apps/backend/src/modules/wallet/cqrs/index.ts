import {
  FindOneWalletQueryHandler,
  FindManyWalletQueryHandler,
  CountWalletQueryHandler,
  CreateOneWalletCommandHandler,
  UpdateOneWalletCommandHandler,
  DeleteOneWalletCommandHandler,
} from './wallet.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [
  FindOneWalletQueryHandler,
  FindManyWalletQueryHandler,
  CountWalletQueryHandler,
];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [
  CreateOneWalletCommandHandler,
  UpdateOneWalletCommandHandler,
  DeleteOneWalletCommandHandler,
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
export * from './wallet.cqrs.input';
