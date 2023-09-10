import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UtilsService } from './utils.service';
import { UtilsResolver } from './utils.resolver';

@Module({
  imports: [CqrsModule],
  providers: [UtilsService, UtilsResolver],
  exports: [UtilsService],
})
export class UtilsModule {}
