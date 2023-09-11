import { registerEnumType } from '@nestjs/graphql';

export interface ISourceMeta {
  url?: string;
  [key: string]: any;
}

/**
 * Blockchain source status
 */
export enum BlockchainSourceStatus {
  ACTIVATED = 'ACTIVATED',
  DEACTIVATED = 'DEACTIVATED',
}
registerEnumType(BlockchainSourceStatus, {
  name: 'BlockchainSourceStatus',
});
