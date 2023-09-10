import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UtilsService } from '@apps/modules/utils/utils.service';
import { EventHandlers, CommandHandlers, QueryHandlers } from './cqrs';
import { BullModule } from '@nestjs/bull';
import {
  QUEUE_JOB,
  QUEUE_MISC,
  QUEUE_SIDE_EFFECT,
} from '@apps/config/constant';
import { QueueService } from './queue.service';
import { Processors } from './processors';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: QUEUE_JOB },
      { name: QUEUE_SIDE_EFFECT },
      { name: QUEUE_MISC }
    ),
    CqrsModule,
    HttpModule,
  ],
  providers: [
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Processors,
    UtilsService,
    QueueService,
  ],
  exports: [QueueService],
})
export class QueueModule {}
