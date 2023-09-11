import { includes } from 'lodash';
import { AbstractEntity } from 'nestjs-dev-utilities';
import { RecordQueryWithJoinOptions } from 'nestjs-typed-cqrs';
import {
  Column,
  Entity,
  OneToMany,
  SelectQueryBuilder,
  TreeChildren,
  Unique,
} from 'typeorm';

import { WalletEntity } from '../wallet/wallet.entity';

@Entity({ name: 'user' })
@Unique(['address', 'username'])
export class UserEntity extends AbstractEntity {
  @Column()
  address: string;

  @Column()
  username: string;

  @OneToMany(() => WalletEntity, (entity) => entity.parent)
  linking: UserEntity[];

  @Column({ type: 'timestamptz', nullable: true })
  lastSyncDate?: Date;

  /**
   *  ---------------------------
   * BUILDER
   *  ---------------------------
   */
  static buildJoinRelation<E extends UserEntity>(
    builder: SelectQueryBuilder<E>,
    options: RecordQueryWithJoinOptions<UserJoinRelationType>
  ) {
    const relation = options?.relation ?? false;
    const joins = options?.joins ?? ['linking'];
    if (!relation) return;

    // join linking relation
    if (includes(joins, 'linking')) {
      builder.leftJoinAndSelect('UserEntity.linking', 'linkingJoin');
    }
  }
}

export type UserJoinRelationType = 'linking'[];
