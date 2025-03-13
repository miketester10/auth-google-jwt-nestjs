/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { GoogleUser } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOrCreateGoogleUser(
    createUserDto: CreateUserDto,
  ): Promise<GoogleUser> {
    let user = await this.userRepository.findOne(createUserDto.providerId);

    if (!user) {
      user = await this.userRepository.create(createUserDto);
    }

    return user;
  }

  async update(
    providerId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<GoogleUser> {
    const user = await this.checkIfUserExists(providerId);
    return this.userRepository.update(user, updateUserDto);
  }

  async remove(providerId: string): Promise<GoogleUser> {
    const user = await this.checkIfUserExists(providerId);
    return this.userRepository.remove(user);
  }

  async findOne(providerId: string): Promise<GoogleUser> {
    return this.checkIfUserExists(providerId);
  }

  async findAll(): Promise<GoogleUser[]> {
    return this.userRepository.findAll();
  }

  private async checkIfUserExists(providerId: string): Promise<GoogleUser> {
    const user = await this.userRepository.findOne(providerId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
