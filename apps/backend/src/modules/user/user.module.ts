import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UtilsModule } from '@apps/modules/utils/utils.module';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { EventHandlers, CommandHandlers, QueryHandlers } from './cqrs';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
    }),
    CqrsModule,
    UtilsModule,
  ],
  providers: [
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    UserService,
    UserResolver,
  ],
  exports: [UserService],
})
export class UserModule {}
