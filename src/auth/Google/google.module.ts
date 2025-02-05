/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtAuthModule } from '../JWT/jwt.module';

@Module({
  imports: [JwtAuthModule, UserModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy],
})
export class GoogleAuthModule {}
