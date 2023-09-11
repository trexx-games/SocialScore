import {
  FindOneBlockchainSourceQueryHandler,
  FindManyBlockchainSourceQueryHandler,
  CountBlockchainSourceQueryHandler,
  CreateOneBlockchainSourceCommandHandler,
  UpdateOneBlockchainSourceCommandHandler,
  DeleteOneBlockchainSourceCommandHandler,
} from './blockchain-source.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [
  FindOneBlockchainSourceQueryHandler,
  FindManyBlockchainSourceQueryHandler,
  CountBlockchainSourceQueryHandler,
];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [
  CreateOneBlockchainSourceCommandHandler,
  UpdateOneBlockchainSourceCommandHandler,
  DeleteOneBlockchainSourceCommandHandler,
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
export * from './blockchain-source.cqrs.input';
