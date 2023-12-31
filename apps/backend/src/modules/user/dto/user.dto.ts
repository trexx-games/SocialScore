import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { AbstractDto } from 'nestjs-dev-utilities';

@ObjectType('User')
export class UserDto extends AbstractDto {
  @FilterableField()
  address: string;

  @FilterableField()
  username: string;

  @Field({ nullable: true })
  lastSyncDate?: Date;
}
