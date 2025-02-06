/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity('google_users')
export class GoogleUser extends BaseEntity {
  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  picture?: string;
}
