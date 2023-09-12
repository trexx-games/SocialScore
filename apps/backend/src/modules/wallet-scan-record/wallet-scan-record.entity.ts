import { includes } from 'lodash';
import { AbstractEntity } from 'nestjs-dev-utilities';
import { RecordQueryWithJoinOptions } from 'nestjs-typed-cqrs';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
  SelectQueryBuilder,
  Unique,
} from 'typeorm';

import { BlockchainSourceEntity } from '../blockchain-source/blockchain-source.entity';
import { WalletEntity } from '../wallet/wallet.entity';

@Entity({ name: 'wallet_scan_record' })
@Unique(['txHash'])
export class WalletScanRecordEntity extends AbstractEntity {
  @Column()
  block: number;

  @Column()
  txHash: string;

  @Column({ type: 'jsonb', default: {} })
  meta?: any;

  @Column()
  @RelationId((entity: WalletScanRecordEntity) => entity.source)
  sourceId: number;

  @ManyToOne(() => BlockchainSourceEntity, (entity) => entity.records)
  @JoinColumn()
  source: BlockchainSourceEntity;

  @Column()
  @RelationId((entity: WalletScanRecordEntity) => entity.wallet)
  walletId: number;

  @ManyToOne(() => WalletEntity, (entity) => entity.records)
  @JoinColumn()
  wallet: WalletEntity;

  /**
   *  ---------------------------
   * BUILDER
   *  ---------------------------
   */
  static buildJoinRelation<E extends WalletScanRecordEntity>(
    builder: SelectQueryBuilder<E>,
    options: RecordQueryWithJoinOptions<WalletScanRecordJoinRelationType>
  ) {
    const relation = options?.relation ?? false;
    const joins = options?.joins ?? ['wallet'];
    if (!relation) return;

    // join parent relation
    if (includes(joins, 'wallet')) {
      builder.leftJoinAndSelect('WalletScanRecordEntity.wallet', 'walletJoin');
    }
    if (includes(joins, 'source')) {
      builder.leftJoinAndSelect('WalletScanRecordEntity.source', 'sourceJoin');
    }
  }
}

export type WalletScanRecordJoinRelationType = ('wallet' | 'source')[];
