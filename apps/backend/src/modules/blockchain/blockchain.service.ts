import { BaseProvider } from '@ethersproject/providers';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import * as Ethers from 'nestjs-ethers';

@Injectable()
export class BlockchainService {
  constructor(
    @Ethers.InjectEthersProvider()
    private readonly ethersProvider: BaseProvider,
    private readonly config: ConfigService<ENV>,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
}
