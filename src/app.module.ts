/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/Google/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rende il modulo di configurazione disponibile globalmente
    }),
    AuthModule,
  ],
})
export class AppModule {}
