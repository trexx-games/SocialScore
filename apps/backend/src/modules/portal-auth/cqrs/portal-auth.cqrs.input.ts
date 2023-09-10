import {
  AbstractCqrsCommandInput,
  AbstractCqrsQueryInput,
  RecordQueryOptions,
} from 'nestjs-typed-cqrs';
import { PortalUserEntity } from '@apps/modules/portal-user/portal-user.entity';
import { AccessTokenPayload } from '@apps/modules/auth/auth.interface';
import { AccessTokenDto } from '@apps/modules/auth/dto/auth.dto';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export class VerifyPortalUser2FACodeQuery extends AbstractCqrsQueryInput<
  PortalUserEntity,
  { user: number | PortalUserEntity; code: string },
  RecordQueryOptions,
  boolean
> {}

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
/**
 * Create access token with payload
 * @example
 ```ts
  const { data } = await this.commandBus.execute(
    new CreatePortalAccessTokenCommand({
      input: {
        reference: 'xxx',
        platform: 'xxx',
      }
    })
  );
  ```
*/
export class CreatePortalAccessTokenCommand extends AbstractCqrsCommandInput<
  AccessTokenDto,
  AccessTokenPayload
> {}

/**
 * Create access token with payload
 * @example
 ```ts
  const { data } = await this.commandBus.execute(
    new RefreshPortalAccessTokenCommand({
      input: {
        refreshToken: 'xxx',
        walletAddress: 'xxx',
        platform: 'xxx'
      }
    })
  );
  ```
*/
export class RefreshPortalAccessTokenCommand extends AbstractCqrsCommandInput<
  AccessTokenDto,
  {
    refreshToken: string;
    platform: AccessTokenPayload['platform'];
  }
> {}
