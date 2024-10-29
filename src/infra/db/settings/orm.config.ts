import 'dotenv/config';
import { TypeDataBasesConnection } from 'src/types/connection';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConnectionConfig: DataSourceOptions = {
  type: process.env.DATABASE_DRIVER as TypeDataBasesConnection,
  serviceName: process.env.DATABASE_NAME || '127.0.0.1',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || '',
  migrationsTableName: 'TB_MIGRATIONS',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/infra/db/migrations/*.{ts,js}'],
  logging: process.env.DATABASE_LOGGING === 'true',
  synchronize: process.env.DATABASE_SYNC === 'true',
};

export const engine = new DataSource(dbConnectionConfig as DataSourceOptions);
