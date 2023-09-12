import { AbstractCqrsCommandInput } from 'nestjs-typed-cqrs';

/**
 * The input for trigger wallet scan across different sources
 */
export type WalletScanProcessorInput = {
  address: string;
};

/**
 * ---------------------------
 * COMMANDS
 * ---------------------------
 */
export class WalletScanProcessorCommand extends AbstractCqrsCommandInput<
  false,
  { reference: string; args: WalletScanProcessorInput },
  false,
  false,
  void
> {}
