import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TypeORMConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/modules/*/infrastructure/model/index{.ts,.js}'],
    migrations: ['dist/config/database/migrations/*{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    migrationsTableName: 'migrations_TypeORM',
    migrationsTransactionMode: 'all'
  })
};
