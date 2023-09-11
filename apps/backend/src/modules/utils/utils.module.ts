import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UtilsResolver } from './utils.resolver';
import { UtilsService } from './utils.service';

@Module({
  imports: [CqrsModule],
  providers: [UtilsService, UtilsResolver],
  exports: [UtilsService],
})
export class UtilsModule {}
