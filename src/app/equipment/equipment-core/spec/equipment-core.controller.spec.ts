import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { EquipmentCoreModule } from '@app/equipment/equipment-core/equipment-core.module';

describe('Equipments', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EquipmentCoreModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET `, () => {
    return request(app.getHttpServer())
      .get('/equipments')
      .expect(200)
      .expect([
        {
          id: '1',
          name: 'Equipment 1',
          description: 'Description 1',
        },
        {
          id: '2',
          name: 'Equipment 2',
          description: 'Description 2',
        },
      ]);
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
        id: '3',
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
