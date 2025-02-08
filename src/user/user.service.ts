/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(GoogleUser)
    private userRepository: Repository<GoogleUser>,
  ) {}

  async findOrCreateGoogleUser(
    createUserDto: CreateUserDto,
  ): Promise<GoogleUser> {
    let user = await this.userRepository.findOne({
      where: { providerId: createUserDto.providerId },
    });

    if (!user) {
      const newUser = this.userRepository.create(createUserDto);
      user = await this.userRepository.save(newUser);
    }

    return user;
  }

  async update(
    providerId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<GoogleUser> {
    const user = await this.checkIfUserExists(providerId);
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(providerId: string): Promise<GoogleUser> {
    const user = await this.checkIfUserExists(providerId);
    return this.userRepository.remove(user);
  }

  async findOne(providerId: string): Promise<GoogleUser> {
    return this.checkIfUserExists(providerId);
  }

  async findAll(): Promise<GoogleUser[]> {
    return this.userRepository.find();
  }

  private async checkIfUserExists(providerId: string): Promise<GoogleUser> {
    const user = await this.userRepository.findOne({ where: { providerId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
