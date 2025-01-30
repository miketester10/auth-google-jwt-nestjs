/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AuthModule {}
