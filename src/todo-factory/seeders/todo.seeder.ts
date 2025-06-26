import { UserRepository } from 'src/user/repository/user.repository';
import { TodoRepository } from 'src/todo/repository/todo.repository';
import { todoFactory } from '../factories/todo.factory';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TodoSeeder {
  private readonly logger = new Logger(TodoSeeder.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoRepository: TodoRepository,
  ) {}

  async seed() {
    this.logger.log('🌱 Seeding Todos...');
    const users = await this.userRepository.findAll();

    for (const user of users) {
      await Promise.all(
        Array.from({ length: 6 }).map(() =>
          this.todoRepository.create(todoFactory(user)),
        ),
      );
    }

    this.logger.log('✅ Seeding completato con successo.');
  }

  async drop() {
    this.logger.log('🗑️ Eliminazione Todos...');
    await this.todoRepository.removeAll();
    this.logger.log('✅ Eliminazione completata con successo.');
  }
}
