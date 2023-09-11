import { Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Resolver(UserDto)
export class UserResolver {
  constructor(readonly service: UserService) {}
}
