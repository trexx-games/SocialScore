import { BlockchainVerifySignerMessageQueryHandler } from './blockchain.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [BlockchainVerifySignerMessageQueryHandler];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [];

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
export const EventHandlers = [];

/**
 * ---------------------------
 * EXPORTS
 * ---------------------------
 */
export * from './blockchain.cqrs.input';
