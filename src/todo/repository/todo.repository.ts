/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/repository/base.repository';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoRepository extends BaseRepository<Todo> {
  constructor(
    @InjectRepository(Todo)
    repository: Repository<Todo>,
  ) {
    super(repository);
  }
}
