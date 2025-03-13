/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { GoogleUser } from 'src/user/entities/user.entity';

@Entity('todos')
export class Todo extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => GoogleUser, (user) => user.todos, { onDelete: 'CASCADE' })
  user: GoogleUser;
}
