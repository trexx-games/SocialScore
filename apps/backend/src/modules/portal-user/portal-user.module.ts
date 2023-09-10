import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UtilsModule } from '@apps/modules/utils/utils.module';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { AnonymousStrategy } from '@apps/modules/auth/strategies/anonymous.strategy';
import { UsePortalAuthRoles } from '@apps/modules/portal-auth/portal-auth.decorator';
import { EventHandlers, CommandHandlers, QueryHandlers } from './cqrs';
import { PortalUserService } from './portal-user.service';
import { PortalUserEntity } from './portal-user.entity';
import { PortalUserDto } from './dto/portal-user.dto';
import { PortalUserResolver } from './portal-user.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([PortalUserEntity]),
        CqrsModule,
        UtilsModule,
      ],
      resolvers: [
        {
          EntityClass: PortalUserEntity,
          DTOClass: PortalUserDto,
          decorators: [UsePortalAuthRoles(['DIRECTOR', 'MANAGER'])],
          read: {
            many: { name: 'getPortalUsers' },
            one: { name: 'getPortalUser' },
          },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
      ],
    }),
    CqrsModule,
    UtilsModule,
  ],
  providers: [
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    PortalUserService,
    AnonymousStrategy,
    PortalUserResolver,
  ],
  exports: [PortalUserService],
})
export class PortalUserModule {}
