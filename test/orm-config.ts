import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'healthin_server',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_DATABASE || 'healthin_test',
  entities: ['**/*.entity.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: true,
  logging: false,
  synchronize: true,
};

export default ormConfig;
