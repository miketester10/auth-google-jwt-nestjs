/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repository/todo.repository';
import { Todo } from './entities/todo.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userService: UserService,
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
    userProviderId: string,
  ): Promise<Todo> {
    const user = await this.userService.findOne(userProviderId);
    return this.todoRepository.create({ ...createTodoDto, user });
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    userProviderId: string,
  ): Promise<Todo> {
    const todo = await this.checkIfTodoExists(id, userProviderId);
    return this.todoRepository.update(todo, updateTodoDto);
  }

  async remove(id: number, userProviderId: string): Promise<Todo> {
    const todo = await this.checkIfTodoExists(id, userProviderId);
    return this.todoRepository.remove(todo);
  }

  async findOne(id: number, userProviderId: string): Promise<Todo> {
    return this.checkIfTodoExists(id, userProviderId);
  }

  async findAll(userProviderId: string): Promise<Todo[]> {
    return this.todoRepository.findAll({
      where: { user: { providerId: userProviderId } },
    });
  }

  private async checkIfTodoExists(
    todoId: number,
    userProviderId: string,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findByCondition({
      where: { id: todoId, user: { providerId: userProviderId } },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
        user: {
          email: true,
          firstName: true,
        },
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }
}
