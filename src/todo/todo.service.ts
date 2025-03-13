/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repository/todo.repository';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}
  create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo';
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }

  async findOne(id: number, userProviderId: string): Promise<Todo> {
    return this.checkIfTodoExists(id, userProviderId);
  }

  findAll() {
    return this.todoRepository.findAll();
  }

  private async checkIfTodoExists(
    todoId: number,
    providerId: string,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findByCondition({
      where: { id: todoId, user: { providerId } },
      relations: ['user'],
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }
}
