/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Carica il file .env
config();

const seedMode = process.env.SEED_MODE === 'true';
const clearMode = process.env.CLEAR_MODE === 'true';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    seedMode || clearMode ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js',
  ],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: process.env.NODE_ENV !== 'production',
  // logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
