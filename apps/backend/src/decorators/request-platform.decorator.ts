import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HEADER_PLATFORM_KEY } from '@apps/config/setting.config';

/**
 * EXAMPLE USAGE
 * ==========================
 * @example

  @Mutation(() => Boolean)
  someMutation(
    @RequestPlatform() platform,
  ) {
    return platform === 'xxx';
  }

 */
export const RequestPlatform = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    let req = null;
    const type = context.getType();
    // check whether is via normal REST request
    if (type === 'http') {
      req = context.switchToHttp().getRequest();
    } else {
      // get gql execution context
      const ctx = GqlExecutionContext.create(context);
      req = ctx.getContext().req;
    }
    return req?.headers[HEADER_PLATFORM_KEY];
  }
);
