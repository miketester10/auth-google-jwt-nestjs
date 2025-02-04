/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(GoogleUser)
    private userRepository: Repository<GoogleUser>,
  ) {}

  async findOrCreateGoogleUser(
    googleProfile: CreateUserDto,
  ): Promise<GoogleUser> {
    let user = await this.userRepository.findOne({
      where: { providerId: googleProfile.providerId },
    });

    if (!user) {
      const newUser = this.userRepository.create(googleProfile);
      user = await this.userRepository.save(newUser);
    }

    return user;
  }

  async profile(providerId: string): Promise<GoogleUser> {
    const user = await this.userRepository.findOne({ where: { providerId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
