import { Outbox } from '../email/outbox.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

enum EmailStatus {
  Sent = 'sent',
  Outbox = 'outbox',
}

@Entity('emails') 
export class Emails  {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  user_detail_id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ManyToMany(() => Outbox, { cascade: true })
  @JoinTable()
  outbox: Outbox[]

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  business_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
