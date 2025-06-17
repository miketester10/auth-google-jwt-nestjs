import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { GoogleUser } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { todoFactory } from '../factories/todo.factory';

export class TodoSeeder {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
    @InjectRepository(GoogleUser)
    private readonly userRepo: Repository<GoogleUser>,
  ) {}

  async seed() {
    console.log('✅ Seeding Todos...');
    const users = await this.userRepo.find();

    for (const user of users) {
      const todos = Array.from({ length: 6 }).map(() =>
        this.todoRepo.create(todoFactory(user)),
      );
      await this.todoRepo.save(todos);
    }

    console.log('✅ Todos creati per gli utenti esistenti.');
  }

  async drop() {
    await this.todoRepo.delete({});
    console.log('🗑️ Todos eliminati');
  }
}
