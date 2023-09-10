import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  HEADER_PLATFORM_KEY,
  ALLOWED_PLATFORM,
} from '@apps/config/setting.config';

@Injectable()
export class RequestHeaderPlatformInterceptor extends ClassSerializerInterceptor {
  constructor(
    protected readonly reflector: any,
    private readonly jwtService: JwtService
  ) {
    super(reflector);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
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

    const platform = req.headers?.[HEADER_PLATFORM_KEY];
    const authorization = req.headers['authorization'];

    // check if ccgds platform in request header
    if (!platform) {
      throw new ForbiddenException('Platform is not specified!');
    }

    // check if sdapp-platform is value is allowed
    if (!ALLOWED_PLATFORM.includes(platform)) {
      throw new ForbiddenException('Platform is not allowed');
    }

    if (authorization) {
      const accessToken = authorization.split(' ')[1];
      const tokenContext = this.jwtService.decode(accessToken);
      if (!!tokenContext && tokenContext['aud'] !== platform) {
        throw new ForbiddenException(
          'Mismatched target platform between request headers and access token!'
        );
      }
    }

    // if exists, pass the request forward
    return next.handle();
  }
}
