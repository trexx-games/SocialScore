import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resolver } from '@nestjs/graphql';

import { WalletScanRecordDto } from './dto/wallet-scan-record.dto';
import { WalletScanRecordService } from './wallet-scan-record.service';

@Resolver(WalletScanRecordDto)
export class WalletScanRecordResolver {
  constructor(
    readonly service: WalletScanRecordService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
}
