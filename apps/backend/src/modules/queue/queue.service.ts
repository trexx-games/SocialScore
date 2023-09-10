import { InjectQueue } from '@nestjs/bull';
import { QUEUE_JOB } from '@apps/config/constant';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(
    @InjectQueue(QUEUE_JOB)
    private queue: Queue
  ) {}
}
