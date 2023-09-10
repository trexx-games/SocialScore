import {
  RecordQueryOptions,
  AbstractCqrsQueryInput,
  AbstractCqrsCommandInput,
  RecordMutateOptions,
} from 'nestjs-typed-cqrs';
import {
  CreatePortalUserInput,
  UpdatePortalUserInput,
} from '../dto/portal-user.input';
import { Query } from '@ptc-org/nestjs-query-core';
import { PortalUserEntity } from '../portal-user.entity';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
/**
 * Find one record
 * @example
 ```ts
  const { data } = await this.queryBus.execute(
    new FindOnePortalUserQuery({
      query: {},
      options: {}
    })
  );
  ```
*/
export class FindOnePortalUserQuery extends AbstractCqrsQueryInput<PortalUserEntity> {}

/**
 * Find many records
 * @example
 ```ts
  const { data } = await this.queryBus.execute(
    new FindManyPortalUserQuery(
      {
        filter: {},
        sorting: {}
      },
      { nullable: true, silence }
    )
  );
  ```
*/
export class FindManyPortalUserQuery extends AbstractCqrsQueryInput<
  PortalUserEntity,
  undefined,
  RecordQueryOptions,
  PortalUserEntity[]
> {}

/**
 * find & count records
 */
export class CountPortalUserQuery extends AbstractCqrsQueryInput<
  PortalUserEntity,
  Query<PortalUserEntity>['filter'],
  undefined,
  number
> {}

/**
 * ---------------------------
 * COMMAND
 * ---------------------------
 */
/**
 * Create one record
 * @example
 ```ts
  const { data } = await this.commandBus.execute(
    new CreateOnePortalUserCommand({
      input: {}
    })
  );
  ```
*/
export class CreateOnePortalUserCommand extends AbstractCqrsCommandInput<
  PortalUserEntity,
  CreatePortalUserInput
> {}

/**
 * Update one record
 * @example
 ```ts
  const { data } = await this.commandBus.execute(
    new UpdateOnePortalUserCommand(
      { id: { eq: 1 } },
      {
        // ...bla bla
      }
    )
  );
  ```
*/
export class UpdateOnePortalUserCommand extends AbstractCqrsCommandInput<
  PortalUserEntity,
  UpdatePortalUserInput,
  true,
  RecordMutateOptions,
  {
    updated: PortalUserEntity;
    before: PortalUserEntity;
  }
> {}

/**
 * Delete one record
 * @example
 ```ts
  const { data } = await this.commandBus.execute(
    new DeleteOnePortalUserCommand(1)
  );
  ```
*/
export class DeleteOnePortalUserCommand extends AbstractCqrsCommandInput<
  PortalUserEntity,
  number
> {}

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
