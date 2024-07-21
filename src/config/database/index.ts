import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.NODE_ENV),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/src/modules/*/infrastructure/model/index{.ts,.js}'],
  migrations: ['dist/src/config/database/migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'migrations_TypeORM',
  migrationsTransactionMode: 'all',
};
