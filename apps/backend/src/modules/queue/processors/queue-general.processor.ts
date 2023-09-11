import { QUEUE_JOB } from '@apps/config/constant';
import { HttpService } from '@nestjs/axios';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueStalled,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { Job } from 'bull';

import { QueueJobEvent } from '../queue.constant';

/**
 * ---------------------------
 * Withdrawal Event
 * ---------------------------
 */
@Processor(QUEUE_JOB)
export class QueueProcessorHandler {
  private readonly logger = new Logger(QueueProcessorHandler.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly config: ConfigService<ENV>,
    private readonly httpService: HttpService
  ) {}

  @Process({ concurrency: 1 })
  async handler(job: Job) {
    const args = job.data;

    try {
      // buy in event
      if (args.event === QueueJobEvent.Xxx) {
        // await this.commandBus.execute(
        //   new SomeCommand({
        //     input: {
        //       reference: args.reference,
        //       args,
        //     },
        //   })
        // );
      }
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    try {
      console.log(
        `[${QueueProcessorHandler.name}] Processing job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueStalled()
  onStalled(job: Job) {
    try {
      console.log(
        `[${QueueProcessorHandler.name}] Stalled job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    try {
      console.log(
        `[${QueueProcessorHandler.name}] Completed job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    try {
      console.log(
        `[${QueueProcessorHandler.name}] Failed job ${job.data.event} with ID: ${job.id}`,
        err.message
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
