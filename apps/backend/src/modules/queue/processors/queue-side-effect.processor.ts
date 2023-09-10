import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueStalled,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { QUEUE_SIDE_EFFECT } from '@apps/config/constant';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { QueueJobEvent } from '../queue.constant';

/**
 * ---------------------------
 * Withdrawal Event
 * ---------------------------
 */
@Processor(QUEUE_SIDE_EFFECT)
export class QueueSideEffectProcessorHandler {
  private readonly logger = new Logger(QueueSideEffectProcessorHandler.name);

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
      if (args.event === QueueJobEvent.Xxx) {
        // await this.commandBus.execute(
        //   new SomeCommand({
        //     input: args,
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
        `[${QueueSideEffectProcessorHandler.name}] Processing job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueStalled()
  onStalled(job: Job) {
    try {
      console.log(
        `[${QueueSideEffectProcessorHandler.name}] Stalled job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    try {
      console.log(
        `[${QueueSideEffectProcessorHandler.name}] Completed job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    try {
      console.log(
        `[${QueueSideEffectProcessorHandler.name}] Failed job ${job.data.event} with ID: ${job.id}`,
        err.message
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
