/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [GoogleStrategy],
})
export class AuthModule {}
