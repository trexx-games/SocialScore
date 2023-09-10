import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PortalAuthJwtGuard extends AuthGuard(['portal-jwt']) {
  getRequest(context: ExecutionContext) {
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
    return req;
  }
}
