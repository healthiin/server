import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Board } from '@domain/community/board.entity';
import { Comment } from '@domain/community/comment.entity';
import { Post } from '@domain/community/post.entity';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { Equipment } from '@domain/equipment/equipment.entity';
import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';
import { GymNotice } from '@domain/gym/entities/gym-notice.entity';
import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { Gym } from '@domain/gym/entities/gym.entity';
import { Meal } from '@domain/meal/meal.entity';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { RoutineType } from '@domain/routine/routine-type.entity';
import { Routine } from '@domain/routine/routine.entity';
import { User } from '@domain/user/user.entity';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'healthin_server',
  password: 'secret',
  database: 'healthin_test',
  entities: [
    User,
    Gym,
    GymUser,
    GymNotice,
    Post,
    Comment,
    Board,
    Equipment,
    GymEquipment,
    Manual,
    Routine,
    RoutineManual,
    RoutineType,
    Meal,
  ],
  migrations: [__dirname, '../src/migration/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: true,
  logging: false,
  synchronize: true,
};

export default ormConfig;
