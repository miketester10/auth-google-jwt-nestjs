/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthModule } from './auth/Google/google.module';
import { JwtAuthModule } from './auth/JWT/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';
import { dataSourceOptions } from 'src/db/data-source';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'auth',
          ttl: 60 * 1000,
          limit: 4,
        },
        {
          name: 'general',
          ttl: 60 * 1000,
          limit: 1000,
        },
      ],
      errorMessage: 'API rate limit exceeded. Please try again later.',
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot(dataSourceOptions),

    GoogleAuthModule,
    JwtAuthModule,
    UserModule,
    TodoModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
