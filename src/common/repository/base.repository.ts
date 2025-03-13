/* eslint-disable prettier/prettier */
import {
  Repository,
  FindOneOptions,
  DeepPartial,
  FindManyOptions,
  ObjectLiteral,
} from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Crea un nuovo record
   * @param createDto - I dati per creare l'entità
   * @returns La nuova entità creata
   */
  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  /**
   * Trova tutti i record
   * @param options - Opzioni di ricerca TypeORM
   * @returns Array di entità
   */
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  /**
   * Trova un record per condizione
   * @param options - Opzioni di ricerca TypeORM
   * @returns L'entità trovata
   */
  async findByCondition(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  /**
   * Aggiorna un record
   * @param entity - L'entità da aggiornare
   * @param updateDto - I dati da aggiornare
   * @returns L'entità aggiornata
   */
  async update(entity: T, updateDto: Partial<T>): Promise<T> {
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  /**
   * Elimina un record
   * @param entity - L'entità da eliminare
   * @returns L'entità eliminata
   */
  async remove(entity: T): Promise<T> {
    return this.repository.remove(entity);
  }
}
