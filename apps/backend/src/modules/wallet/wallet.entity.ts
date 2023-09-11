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

import { UserEntity } from '../user/user.entity';

@Entity({ name: 'wallet' })
@Unique(['address'])
export class WalletEntity extends AbstractEntity {
  @Column()
  address: string;

  @Column({ nullable: true })
  @RelationId((entity: WalletEntity) => entity.parent)
  parentId?: number;

  @ManyToOne(() => UserEntity, (entity) => entity.linking)
  @JoinColumn()
  parent?: UserEntity;

  @Column({ type: 'timestamptz', nullable: true })
  lastSyncDate?: Date;

  /**
   *  ---------------------------
   * BUILDER
   *  ---------------------------
   */
  static buildJoinRelation<E extends WalletEntity>(
    builder: SelectQueryBuilder<E>,
    options: RecordQueryWithJoinOptions<WalletJoinRelationType>
  ) {
    const relation = options?.relation ?? false;
    const joins = options?.joins ?? ['user'];
    if (!relation) return;

    // join parent relation
    if (includes(joins, 'parent')) {
      builder.leftJoinAndSelect('WalletEntity.parent', 'parentJoin');
    }
  }
}

export type WalletJoinRelationType = 'parent'[];
