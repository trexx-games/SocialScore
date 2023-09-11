import { Column, Entity, Unique } from 'typeorm';
import { AbstractEntity } from 'nestjs-dev-utilities';
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

  @Column({
    type: 'enum',
    enum: BlockchainSourceStatus,
    default: BlockchainSourceStatus.ACTIVATED,
  })
  status: BlockchainSourceStatus;
}
