import { UserEntity } from '@apps/modules/user/user.entity';
import {
  AbstractCqrsCommandInput,
  AbstractCqrsQueryInput,
  RecordQueryOptions,
} from 'nestjs-typed-cqrs';
import { AccessTokenPayload } from '../auth.interface';
import { AccessTokenDto } from '../dto/auth.dto';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export class VerifyUser2FACodeQuery extends AbstractCqrsQueryInput<
  UserEntity,
  { user: number | UserEntity; code: string },
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
    new CreateAccessTokenCommand({
      input: {
        referralCode: 'xxx',
        platform: 'xxx',
      }
    })
  );
  ```
*/
export class CreateAccessTokenCommand extends AbstractCqrsCommandInput<
  AccessTokenDto,
  AccessTokenPayload
> {}

/**
 * Create access token with payload
 * @example
 ```ts
  const { data } = await this.commandBus.execute(
    new RefreshAccessTokenCommand({
      input: {
        refreshToken: 'xxx',
        walletAddress: 'xxx',
      }
    })
  );
  ```
*/
export class RefreshAccessTokenCommand extends AbstractCqrsCommandInput<
  AccessTokenDto,
  {
    refreshToken: string;
  }
> {}
