import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AirstackService } from './airstack.service';
import { AirstackController } from './airstack.controller';

@Module({
  imports: [CqrsModule],
  providers: [AirstackService, AirstackController],
  exports: [AirstackService],
})
export class AirstackModule {}
