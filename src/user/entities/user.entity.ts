/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Todo } from 'src/todo/entities/todo.entity';

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

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
