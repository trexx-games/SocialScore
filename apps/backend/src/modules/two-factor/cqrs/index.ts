import {
  VerifyTwoFactorQueryHandler,
  GenerateTwoFactorCommandHandler,
} from './two-factor.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [VerifyTwoFactorQueryHandler];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [GenerateTwoFactorCommandHandler];

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
export const EventHandlers = [];

// ---------------------------
// EXPORTS
export * from './two-factor.cqrs.input';
