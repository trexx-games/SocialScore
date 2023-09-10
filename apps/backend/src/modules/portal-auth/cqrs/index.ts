import {
  VerifyPortalUser2FACodeQueryHandler,
  CreatePortalAccessTokenCommandHandler,
  RefreshPortalAccessTokenCommandHandler,
} from './portal-auth.cqrs.handler';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export const QueryHandlers = [VerifyPortalUser2FACodeQueryHandler];

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export const CommandHandlers = [
  CreatePortalAccessTokenCommandHandler,
  RefreshPortalAccessTokenCommandHandler,
];

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
export const EventHandlers = [];
