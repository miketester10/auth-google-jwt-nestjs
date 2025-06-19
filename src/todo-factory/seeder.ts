import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const seeder = app.get(SeederModule);
  const configService = app.get(ConfigService);
  const clearMode = configService.get<string>('CLEAR_MODE') === 'true';
  if (clearMode) {
    await seeder.drop();
    return;
  }
  await seeder.seed();

  await app.close();
}

bootstrap();
