import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleAuthModule } from './auth/Google/google.module';
import { JwtAuthModule } from './auth/JWT/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'auth',
        ttl: 60 * 1000,
        limit: 4,
      },
      {
        name: 'user',
        ttl: 60 * 1000,
        limit: 1000,
      },
    ]),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
    }),

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
