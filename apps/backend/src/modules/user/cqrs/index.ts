import {
  CountUserQueryHandler,
  CreateOneUserCommandHandler,
  DeleteOneUserCommandHandler,
  FindManyUserQueryHandler,
  FindOneUserQueryHandler,
  UpdateOneUserCommandHandler,
} from './user.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [
  FindOneUserQueryHandler,
  FindManyUserQueryHandler,
  CountUserQueryHandler,
];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [
  CreateOneUserCommandHandler,
  UpdateOneUserCommandHandler,
  DeleteOneUserCommandHandler,
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
export * from './user.cqrs.input';
