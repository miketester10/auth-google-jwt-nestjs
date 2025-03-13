/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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

  /**
   * Trova un record per providerId.
   * @Override del metodo findOne della superclasse BaseRepository.
   * @param providerId - providerId dell'entità
   * @param options - Opzioni di ricerca TypeORM
   * @returns L'entità trovata
   */
  override async findOne(
    providerId: string,
    options?: FindOneOptions<GoogleUser>,
  ): Promise<GoogleUser | null> {
    const where = {
      where: { providerId },
      ...options,
    } as FindOneOptions<GoogleUser>;
    return await this.repository.findOne(where);
  }
}
