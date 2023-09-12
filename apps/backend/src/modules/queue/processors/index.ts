import { QueueProcessorHandler } from './queue-general.processor';
import { QueueSideEffectProcessorHandler } from './queue-side-effect.processor';

export const Processors = [
  QueueProcessorHandler,
  QueueSideEffectProcessorHandler,
];
