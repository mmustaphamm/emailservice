import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({name: "tokenBlacklist"})
export class TokenBlacklist {
  @PrimaryGeneratedColumn({type: "bigint"})
  id: number;

  @Column({type: "text"})
  token: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;
}
