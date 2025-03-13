/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from './repository/todo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}
