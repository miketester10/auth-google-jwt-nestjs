import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const seeder = app.get(SeederModule);
  await seeder.seed(); // oppure .drop() se vuoi prima cancellare

  console.log('✅ Seeding completato con successo.');

  await app.close();
}

bootstrap();
