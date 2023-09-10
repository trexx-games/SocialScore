import { Column, Entity, SelectQueryBuilder, Unique } from 'typeorm';
import { AbstractEntity } from 'nestjs-dev-utilities';
import { RecordQueryWithJoinOptions } from 'nestjs-typed-cqrs';
import { PortalUserStatusType, PortalUserType } from './portal-user.constant';

type PortalUserJoinRelationType = 'activities'[];

@Entity({ name: 'portal_user' })
@Unique(['username', 'reference'])
export class PortalUserEntity extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: PortalUserType,
    default: PortalUserType.MANAGER,
  })
  type: PortalUserType;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  reference: string;

  @Column({
    type: 'enum',
    enum: PortalUserStatusType,
    default: PortalUserStatusType.PENDING,
  })
  status: PortalUserStatusType;

  @Column({ nullable: true })
  twoFactorSecret?: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastLoginDate?: Date;

  // @OneToMany(() => PortalUserActivityEntity, (entity) => entity.user)
  // activities: PortalUserActivityEntity[];

  /**
   *  ---------------------------
   */
  static buildJoinRelation<E extends PortalUserEntity>(
    builder: SelectQueryBuilder<E>,
    options: RecordQueryWithJoinOptions<PortalUserJoinRelationType>
  ) {
    const relation = options?.relation ?? false;
    if (!relation) return;

    // join parent relation
    // builder.leftJoinAndSelect('PortalUserEntity.activities', 'activitiesJoin');
  }
}
