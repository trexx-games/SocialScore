import { QueueProcessorHandler } from './queue-general.processor';
import { QueueMiscProcessorHandler } from './queue-misc.processor';
import { QueueSideEffectProcessorHandler } from './queue-side-effect.processor';

export const Processors = [
  QueueProcessorHandler,
  QueueMiscProcessorHandler,
  QueueSideEffectProcessorHandler,
];
