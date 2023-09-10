import {
  FindOnePortalUserQueryHandler,
  FindManyPortalUserQueryHandler,
  CountPortalUserQueryHandler,
  CreateOnePortalUserCommandHandler,
  UpdateOnePortalUserCommandHandler,
  DeleteOnePortalUserCommandHandler,
} from './portal-user.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [
  FindOnePortalUserQueryHandler,
  FindManyPortalUserQueryHandler,
  CountPortalUserQueryHandler,
];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [
  CreateOnePortalUserCommandHandler,
  UpdateOnePortalUserCommandHandler,
  DeleteOnePortalUserCommandHandler,
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
export * from './portal-user.cqrs.input';
