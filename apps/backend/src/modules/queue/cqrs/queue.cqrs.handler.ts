import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {
  QUEUE_JOB,
  QUEUE_MISC,
  QUEUE_SIDE_EFFECT,
} from '@apps/config/constant';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { CreateOneQueueJobCommand } from './queue.cqrs.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
@CommandHandler(CreateOneQueueJobCommand)
export class CreateOneQueueJobCommandHandler<Data>
  implements IInferredCommandHandler<CreateOneQueueJobCommand<Data>>
{
  constructor(
    @InjectQueue(QUEUE_JOB)
    private queue: Queue,
    @InjectQueue(QUEUE_SIDE_EFFECT)
    private queueSide: Queue,
    @InjectQueue(QUEUE_MISC)
    private queueMisc: Queue
  ) {}
  async execute(
    command: CreateOneQueueJobCommand<Data>
  ): Promise<CommandResult<CreateOneQueueJobCommand<Data>>> {
    const { input, options } = command.args;
    const silence = options?.silence ?? false;
    try {
      const { queue = 'general', id: jobId, name, identifier } = input;

      // choose the right queue
      let targetQueue = this.queue;
      if (queue === 'sideEffect') {
        targetQueue = this.queueSide;
      }
      if (queue === 'misc') {
        targetQueue = this.queueMisc;
      }
      // job without named
      if (!identifier) {
        const response = await targetQueue.add(
          {
            event: name,
            ...input.data,
          },
          { jobId, ...options }
        );
        return { success: true, data: response };
      }
      // named job
      const response = await targetQueue.add(
        identifier,
        {
          event: name,
          ...input.data,
        },
        { jobId, ...options?.jobOptions }
      );
      return { success: true, data: response };
    } catch (e) {
      if (!silence) throw new Error(e);
      return { success: false, message: e.message };
    }
  }
}

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
