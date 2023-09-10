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
import { QUEUE_MISC } from '@apps/config/constant';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { MiscQueueJobEvent } from '../queue.constant';

/**
 * ---------------------------
 * Miscellaneous Queue Processor
 * ---------------------------
 */
@Processor(QUEUE_MISC)
export class QueueMiscProcessorHandler {
  private readonly logger = new Logger(QueueMiscProcessorHandler.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly config: ConfigService<ENV>,
    private readonly httpService: HttpService
  ) {}

  @Process()
  async handler(job: Job) {
    const args = job.data;

    try {
      if (args.event === MiscQueueJobEvent.Xxx) {
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
        `[${QueueMiscProcessorHandler.name}] Processing job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueStalled()
  onStalled(job: Job) {
    try {
      console.log(
        `[${QueueMiscProcessorHandler.name}] Stalled job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    try {
      console.log(
        `[${QueueMiscProcessorHandler.name}] Completed job ${job.data.event} with ID: ${job.id}`
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    try {
      console.log(
        `[${QueueMiscProcessorHandler.name}] Failed job ${job.data.event} with ID: ${job.id}`,
        err.message
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
