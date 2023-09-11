import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AirstackController } from './airstack.controller';
import { AirstackService } from './airstack.service';

@Module({
  imports: [CqrsModule],
  providers: [AirstackService, AirstackController],
  exports: [AirstackService],
})
export class AirstackModule {}
