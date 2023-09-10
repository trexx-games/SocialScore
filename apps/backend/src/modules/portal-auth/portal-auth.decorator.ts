import {
  UseGuards,
  Injectable,
  SetMetadata,
  CanActivate,
  applyDecorators,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PortalAuthJwtOrGuestGuard } from './guards/portal-auth-jwt-with-guest.guard';
import { PortalAuthJwtGuard } from './guards/portal-auth-jwt.guard';
import {
  AccessTokenPortalUser,
  PortalAuthRolesType,
  PortalUserGuardOptions,
} from './portal-auth.interface';

export const ROLES_KEY = 'roles';
export const ALLOW_GUEST_KEY = 'allow_guest';

// the guard used to check current login portal user whether authorized
@Injectable()
export class PortalAuthRoleGuard<User extends AccessTokenPortalUser>
  implements CanActivate
{
  constructor(private reflector: Reflector) {}

  protected getUser(context: ExecutionContext): User {
    const type = context.getType();
    let req = null;
    // check whether is via normal REST request
    if (type === 'http') {
      req = context.switchToHttp().getRequest();
    } else {
      // get gql execution context
      const ctx = GqlExecutionContext.create(context);
      req = ctx.getContext().req;
    }
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return req.user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const allowGuest = this.reflector.getAllAndOverride<string[]>(
      ALLOW_GUEST_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (allowGuest || !roles) {
      return true;
    }

    if (roles.includes('*')) {
      return true;
    }
    const userRole = this.getUser(context).user.type;
    const isAuthorized = roles.includes(userRole);
    if (!isAuthorized) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

/**
 * PortalAuthRoles
 * ------------------------
 * few scenarios supported:
 ```ts
 // only authenticated user who has a role can access it
 // then can retrieve the AccessTokenContextData through @CurrentUser()
 PortalAuthRoles(['*'])

 // anyone (including non-login user) can access it
 // if the user is not login, @CurrentUser() will return {}
 PortalAuthRoles(['*'], { allowGuest = true })

 // If didn't use the PortalAuthRoles at all, then anyone can access it
 // even if the user is login, @CurrentUser() will return {}
 ```
 */
export function PortalAuthRoles(
  roles: PortalAuthRolesType,
  options?: PortalUserGuardOptions
) {
  const allowGuest = options?.allowGuest ?? false;
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    SetMetadata(ALLOW_GUEST_KEY, options?.allowGuest),
    UseGuards(
      allowGuest ? PortalAuthJwtOrGuestGuard : PortalAuthJwtGuard,
      PortalAuthRoleGuard
    )
  );
}

/**
 * UsePortalAuthRoles
 * ------------------------
 * Decorator that can used with nestjs-query
 * @example
 ```ts
  UsePortalAuthRoles(["DIRECTOR"])
 ```
 */
export const UsePortalAuthRoles = (
  roles: PortalAuthRolesType,
  options: PortalUserGuardOptions = null
) => {
  return PortalAuthRoles(roles, options);
};

export default PortalAuthRoles;
