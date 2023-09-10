import { CreateOneQueueJobCommandHandler } from './queue.cqrs.handler';

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
export const CommandHandlers = [CreateOneQueueJobCommandHandler];

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
export * from './queue.cqrs.input';
