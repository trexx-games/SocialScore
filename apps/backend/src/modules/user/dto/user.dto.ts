import { AbstractDto } from 'nestjs-dev-utilities';
import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { UserStatusType } from '../user.constant';

@ObjectType('User')
export class UserDto extends AbstractDto {
  @Field()
  firstName: string;

  @FilterableField()
  lastName: string;

  @FilterableField()
  username: string;

  @Field()
  referralCode: string;

  @FilterableField(() => UserStatusType)
  status: UserStatusType;
}
