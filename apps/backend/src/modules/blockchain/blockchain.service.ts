import * as Ethers from 'nestjs-ethers';
import { ConfigService } from '@nestjs/config';
import { BaseProvider } from '@ethersproject/providers';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';

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
