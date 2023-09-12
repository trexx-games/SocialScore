// create wallet input
export class CreateWalletScanRecordInput {
  block: number;
  txHash: string;
  sourceId: number;
  walletId: number;
  meta?: Record<string, any>;
}

// update wallet input
export class UpdateWalletScanRecordInput extends CreateWalletScanRecordInput {}
