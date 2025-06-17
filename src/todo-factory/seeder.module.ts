import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleUser } from 'src/user/entities/user.entity';
import { dataSourceOptions } from 'db/data-source';
import { Todo } from 'src/todo/entities/todo.entity';
import { TodoSeeder } from './seeders/todo.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Todo, GoogleUser]),
  ],
  providers: [TodoSeeder],
})
export class SeederModule {
  constructor(private readonly todoSeeder: TodoSeeder) {}

  async seed() {
    await this.todoSeeder.seed();
  }

  async drop() {
    await this.todoSeeder.drop();
  }
}
