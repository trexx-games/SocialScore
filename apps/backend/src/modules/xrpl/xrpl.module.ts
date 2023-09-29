import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { XrplController } from './xrpl.controller';
import { XrplService } from './xrpl.service';

@Module({
  imports: [CqrsModule],
  providers: [XrplService, XrplController],
  exports: [XrplService],
})
export class XrplModule {}
