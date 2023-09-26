// src/entities/Email.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Emails } from '../auth/email.entity';

enum EmailStatus {
  Sent = 'sent',
  Outbox = 'outbox',
}

@Entity()
export class Outbox {
  
  @PrimaryGeneratedColumn({type:"bigint"})
  id: number;

  @Column({type:"json" })
  to: string[];

  @Column({type:"json", nullable: true })
  cc: string[] | null

  @Column({ type: "json", nullable: true})
  bcc: string[] | null

  @Column({ type: "text"})
  subject: string 

  @Column({type: "text" })
  messageBody: string;

  @Column({
    type: 'boolean',
    default: 0
  })
  sent: boolean;

  @ManyToMany(() => Emails, { cascade: true })
  sentTo: Emails[];
}
