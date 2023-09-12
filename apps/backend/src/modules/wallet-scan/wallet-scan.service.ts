import { UtilsService } from '@apps/modules/utils/utils.service';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class WalletScanService {
  constructor(
    private readonly utils: UtilsService,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  /**
   * ------------------------------------------------------
   * Basic Functions
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Helper Functions
   * ------------------------------------------------------
   */
}
