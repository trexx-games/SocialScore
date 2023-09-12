import {
  CommandHandler,
  CommandResult,
  IInferredCommandHandler,
} from '@nestjs-architects/typed-cqrs';

import { WalletScanProcessorCommand } from './wallet-scan.processor.input';
import { WalletScanProcessorService } from './wallet-scan.processor.service';

/**
 * ---------------------------
 * Wallet Scan Processor Command
 * ---------------------------
 */
@CommandHandler(WalletScanProcessorCommand)
export class WalletScanProcessorCommandHandler
  implements IInferredCommandHandler<WalletScanProcessorCommand>
{
  constructor(readonly service: WalletScanProcessorService) {}
  async execute(
    command: WalletScanProcessorCommand
  ): Promise<CommandResult<WalletScanProcessorCommand>> {
    const { input } = command.args;
    await this.service.handle(input.reference, input.args);
    return { success: true };
  }
}
