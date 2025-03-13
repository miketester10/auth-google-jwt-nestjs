/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from '../entities/user.entity';
import { BaseRepository } from 'src/common/repository/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<GoogleUser> {
  constructor(
    @InjectRepository(GoogleUser)
    repository: Repository<GoogleUser>,
  ) {
    super(repository);
  }
}
