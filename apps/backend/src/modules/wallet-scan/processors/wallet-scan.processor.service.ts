import { PerformBlockScanCommand } from '@apps/modules/blockchain-scan/cqrs';
import { FindManyBlockchainSourceQuery } from '@apps/modules/blockchain-source/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { WalletScanProcessorInput } from './wallet-scan.processor.input';

/**
 * ---------------------------
 * WalletScan Process Service
 * ---------------------------
 */
@Injectable()
export class WalletScanProcessorService {
  private readonly logger = new Logger(WalletScanProcessorService.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  /**
   * ------------------------------------------------------
   * Main Function
   * ------------------------------------------------------
   */
  async handle(reference: string, payload: WalletScanProcessorInput) {
    const { address } = payload;

    try {
      // get the verified sources
      const { data: sources } = await this.queryBus.execute(
        new FindManyBlockchainSourceQuery({ query: {} })
      );

      // loop through sources & construct wallet scan process
      const promises = sources.map((e) => {
        return {
          key: e,
          event: new PerformBlockScanCommand({
            input: { source: e, walletAddress: address },
            options: { silence: true },
          }),
        };
      });

      // perform scan one by one
      for (const promise of promises) {
        await this.commandBus.execute(promise.event);
      }
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
