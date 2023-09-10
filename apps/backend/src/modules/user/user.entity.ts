import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
  SelectQueryBuilder,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
} from 'typeorm';
import { includes } from 'lodash';
import { RecordQueryWithJoinOptions } from 'nestjs-typed-cqrs';
import { AbstractEntity } from 'nestjs-dev-utilities';
import { UserStatusType } from './user.constant';

@Entity({ name: 'user' })
@Tree('materialized-path')
@Unique(['username', 'referralCode'])
export class UserEntity extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  // the unique referral code of user
  @Column()
  referralCode: string;

  // the materialized path for user
  mpath?: string;

  // the up-line user id
  @Column({ nullable: true })
  @RelationId((entity: UserEntity) => entity.referrer)
  referrerId?: number;

  @ManyToOne(() => UserEntity, (entity) => entity.children)
  @JoinColumn()
  @TreeParent()
  referrer?: UserEntity;

  @OneToMany(() => UserEntity, (entity) => entity.referrer)
  @TreeChildren({ cascade: true })
  children: UserEntity[];

  @Column({
    type: 'enum',
    enum: UserStatusType,
    default: UserStatusType.PENDING,
  })
  status: UserStatusType;

  @Column({ nullable: true })
  twoFactorSecret?: string;

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
    const joins = options?.joins ?? ['parent'];
    if (!relation) return;

    // join parent relation
    if (includes(joins, 'referrer')) {
      builder.leftJoinAndSelect('UserEntity.referrer', 'referrerJoin');
    }
  }
}

export type UserJoinRelationType = 'referrer'[];
