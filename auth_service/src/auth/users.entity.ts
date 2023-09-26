import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('users') 
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  user_detail_id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  merchant_account_id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  service_id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'tinyint', default: 0 })
  is_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
