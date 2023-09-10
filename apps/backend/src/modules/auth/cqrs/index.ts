import {
  VerifyUser2FACodeQueryHandler,
  CreateAccessTokenCommandHandler,
  RefreshAccessTokenCommandHandler,
} from './auth.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [VerifyUser2FACodeQueryHandler];

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
