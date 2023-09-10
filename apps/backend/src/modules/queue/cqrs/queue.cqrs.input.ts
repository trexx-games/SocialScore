import Bull, { Job } from 'bull';
import {
  AbstractCqrsCommandInput,
  RecordMutateOptions,
} from 'nestjs-typed-cqrs';

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
export class CreateOneQueueJobCommand<Data> extends AbstractCqrsCommandInput<
  false,
  {
    // the queue to add job, default to general
    queue?: 'general' | 'sideEffect' | 'misc';
    // the id of the job
    id: string;
    // the name of the job, so we human can recognize
    name: string;
    // reference of the job, this is for code to easy reference
    reference: string;
    // the job identifier, is also the job name for code to know
    identifier?: string;
    // the data that passed to job
    data?: Data;
  },
  false,
  RecordMutateOptions & {
    jobOptions: Omit<Bull.JobOptions, 'jobId'>;
  },
  Job<Data>
> {}

/**
 * ---------------------------
 * EVENTS
 * ---------------------------
 */
