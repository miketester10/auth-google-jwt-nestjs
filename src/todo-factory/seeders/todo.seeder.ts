import { UserRepository } from 'src/user/repository/user.repository';
import { TodoRepository } from 'src/todo/repository/todo.repository';
import { todoFactory } from '../factories/todo.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoSeeder {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoRepository: TodoRepository,
  ) {}

  async seed() {
    console.log('✅ Seeding Todos...');
    const users = await this.userRepository.findAll();

    for (const user of users) {
      await Promise.all(
        Array.from({ length: 6 }).map(() =>
          this.todoRepository.create(todoFactory(user)),
        ),
      );
    }

    console.log('✅ Seeding completato con successo.');
  }

  async drop() {
    console.log('🗑️ Eliminazione Todos...');
    await this.todoRepository.removeAll();
    console.log('🗑️ Todos eliminati con successo.');
  }
}
