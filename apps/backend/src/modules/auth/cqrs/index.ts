import {
  CreateAccessTokenCommandHandler,
  RefreshAccessTokenCommandHandler,
} from './auth.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [
  CreateAccessTokenCommandHandler,
  RefreshAccessTokenCommandHandler,
];

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
export * from './auth.cqrs.input';
