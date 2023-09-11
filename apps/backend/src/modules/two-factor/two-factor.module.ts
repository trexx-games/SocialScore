import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs';
import { TwoFactorService } from './two-factor.service';

@Module({
  imports: [CqrsModule],
  providers: [
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    TwoFactorService,
  ],
  exports: [TwoFactorService],
})
export class TwoFactorModule {}
