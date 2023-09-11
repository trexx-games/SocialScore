import {
  QUEUE_JOB,
  QUEUE_MISC,
  QUEUE_SIDE_EFFECT,
} from '@apps/config/constant';
import { UtilsService } from '@apps/modules/utils/utils.service';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs';
import { Processors } from './processors';
import { QueueService } from './queue.service';

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
