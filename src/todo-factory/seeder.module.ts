import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { TodoSeeder } from './seeders/todo.seeder';
import { UserModule } from 'src/user/user.module';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    TodoModule,
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
