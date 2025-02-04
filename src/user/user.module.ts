/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { GoogleUser } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleUser])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
