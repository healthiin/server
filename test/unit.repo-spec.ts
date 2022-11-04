import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import ormConfig from './orm-config';


import { AppModule } from '@app/app.module';
import { UserCreateRequest } from '@app/user/dtos/user-create.request';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { RoutineCoreService } from '@app/routine/routine-core/routine-core.service';
import { UserService } from '@app/user/user.service';
import { UserCreateData } from '@app/user/commands/user-create.data'




describe('App Module Integration', () => {
  let app;

  beforeEach(async () => {
    // for jwt module, we need to set APP_SECRET env variable
    process.env = {"APP_SECRET":"TEST" };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        TypeOrmModule.forRoot({ ...ormConfig,
          type: "better-sqlite3",
          database: ":memory:",
        }),
        EventEmitterModule.forRoot(),
        AppModule,
        InfrastructureModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Unit Test User', async () => {
    let userService = app.get(UserService);
    await userService.createUser({"username": "test", "nickname": ""});
  });
});
