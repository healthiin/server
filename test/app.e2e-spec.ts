import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import ormConfig from './orm-config';

import { AppModule } from '@app/app.module';
import { UserCreateRequest } from '@app/user/dtos/user-create.request';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

describe('App Module Integration', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        TypeOrmModule.forRoot(ormConfig),
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

  it('e2e 테스트 작동 확인', () => {
    return request(app.getHttpServer())
      .get('/hello?name=world')
      .expect(200)
      .expect('Hello world!');
  });

  describe('userModule', () => {
    describe('/user (POST)', () => {
      it('should return 201', async () => {
        const requestBody: UserCreateRequest = {
          username: 'testUserName',
        };
        const response = await request(app.getHttpServer())
          .post('/users')
          .send(requestBody);

        expect(response.status).toBe(201);
      });

      it('should return 409 given exist username', async () => {
        const requestBody1: UserCreateRequest = {
          username: 'testUserName',
        };
        const response1 = await request(app.getHttpServer())
          .post('/users')
          .send(requestBody1);

        expect(response1.status).toBe(201);

        const requestBody: UserCreateRequest = {
          username: 'testUserName',
        };

        const response = await request(app.getHttpServer())
          .post('/users')
          .send(requestBody);

        expect(response.status).toBe(409);
      });
    });
  });
});
