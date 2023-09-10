import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Resolver(UserDto)
export class UserResolver {
  constructor(readonly service: UserService) {}

  @ResolveField(() => Boolean)
  async twoFactorEnabled(@Parent() entity: UserEntity): Promise<boolean> {
    return !!entity.twoFactorSecret;
  }
}
