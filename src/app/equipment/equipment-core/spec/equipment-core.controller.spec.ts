import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { EquipmentCoreModule } from '@app/equipment/equipment-core/equipment-core.module';
import { Equipment } from '@domain/equipment/entities/equipment.entity';

describe('Equipments', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        EquipmentCoreModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'healthin',
          password: 'secret',
          database: 'healthin_server',
          entities: [Equipment],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET `, () => {
    return request(app.getHttpServer()).get('/equipments').expect(200);
  });

  it(`/POST `, () => {
    return request(app.getHttpServer())
      .post('/equipments')
      .send({
        name: 'Equipment 3',
        description: 'Description 3',
      })
      .expect(201)
      .expect({
        id: expect.any(String),
        name: 'Equipment 3',
        description: 'Description 3',
      });
  });

  it(`/PATCH `, () => {
    return request(app.getHttpServer())
      .patch('/equipments/3')
      .send({
        name: 'Equipment 3 - Updated',
        description: 'Description 3 - Updated',
      })
      .expect(200)
      .expect({
        id: '3',
        name: 'Equipment 3 - Updated',
        description: 'Description 3 - Updated',
      });
  });

  it(`/DELETE `, () => {
    return request(app.getHttpServer())
      .delete('/equipments/3')
      .expect(200)
      .expect('true');
  });

  afterAll(async () => {
    await app.close();
  });
});
