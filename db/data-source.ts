/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Carica il file .env
config();

const isSeeder = process.env.SEED_MODE === 'true';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [isSeeder ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: process.env.NODE_ENV !== 'production',
  // logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
