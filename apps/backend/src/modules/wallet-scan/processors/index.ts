import { WalletScanProcessorCommandHandler } from './wallet-scan.processor.handler';
import { WalletScanProcessorService } from './wallet-scan.processor.service';

export const ProcessorServices = [WalletScanProcessorService];
export const ProcessorHandlers = [WalletScanProcessorCommandHandler];
export * from './wallet-scan.processor.input';
