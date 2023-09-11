import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { BlockchainSourceDto } from './dto/blockchain-source.dto';
import { BlockchainSourceEntity } from './blockchain-source.entity';
import { BlockchainSourceService } from './blockchain-source.service';
import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([BlockchainSourceEntity])],
      resolvers: [
        {
          DTOClass: BlockchainSourceDto,
          EntityClass: BlockchainSourceEntity,
          // read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
          enableTotalCount: true,
        },
      ],
    }),
    CqrsModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    BlockchainSourceService,
  ],
  exports: [BlockchainSourceService],
})
export class BlockchainSourceModule {}
