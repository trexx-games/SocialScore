import { AbstractEntity } from 'nestjs-dev-utilities';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { WalletScanRecordEntity } from '../wallet-scan-record/wallet-scan-record.entity';

import {
  BlockchainSourceStatus,
  ISourceMeta,
} from './blockchain-source.interface';

@Entity({ name: 'blockchain_source' })
@Unique(['address'])
export class BlockchainSourceEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'jsonb', default: {} })
  meta?: ISourceMeta;

  @OneToMany(() => WalletScanRecordEntity, (entity) => entity.source)
  records: WalletScanRecordEntity[];

  @Column({
    type: 'enum',
    enum: BlockchainSourceStatus,
    default: BlockchainSourceStatus.ACTIVATED,
  })
  status: BlockchainSourceStatus;
}
