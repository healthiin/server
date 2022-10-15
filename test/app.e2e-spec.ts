import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Connection } from 'typeorm';

import ormConfig from './orm-config';

import { AppController } from '@app/app.controller';
import { UserCreateRequest } from '@app/user/dtos/user-create.request';
import { UserModule } from '@app/user/user.module';
import { User } from '@domain/user/user.entity';

describe('App Module Integration', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot(ormConfig),
        UserModule,
      ],
      controllers: [AppController],
    }).compile();

    app = moduleFixture.createNestApplication();
    const connection = app.get(Connection);
    await connection.synchronize(true);
    await app.init();
  });

  afterEach(async () => {
    const connection = app.get(Connection);
    await connection.synchronize(true);
  });

  afterAll(async () => {
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

    // describe('/users/${userId} (GET)', () => {
    //   it('should return 200', async () => {
    //     const requestBody1: UserCreateRequest = {
    //       username: 'testUserName',
    //     };
    //
    //     const response1 = await request(app.getHttpServer())
    //       .post('/users')
    //       .send(requestBody1);
    //
    //     expect(response1.status).toBe(201);
    //
    //     const userId = 'testUserName';
    //
    //     const response = await request(app.getHttpServer()).get(
    //       `/users/${userId}`,
    //     );
    //
    //     expect(response.status).toBe(200);
    //   });
    // });
  });
});
