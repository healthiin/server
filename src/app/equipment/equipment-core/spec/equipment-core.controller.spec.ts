import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { CreateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/create-equipment-core.request';
import { EquipmentCoreModule } from '@app/equipment/equipment-core/equipment-core.module';
import { Equipment } from '@domain/equipment/entities/equipment.entity';
import { Manual } from '@domain/equipment/entities/manual.entity';
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
          entities: [Equipment, Manual],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Equipment Story', () => {
    const equipmentPayload: CreateEquipmentCoreRequest = {
      name: 'Equipment 1',
      description: 'Description 1',
    };

    const equipmentUpdatePayload: CreateEquipmentCoreRequest = {
      name: 'Equipment 1 Updated',
      description: 'Description 1 Updated',
    };

    it('should create a equipment', async () => {
      const equipmentResponse = await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload);

      expect(equipmentResponse.status).toBe(201);
    });

    it('should get every equipments', async () => {
      await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload)
        .expect(201);
      await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload)
        .expect(201);

      const response = await request(app.getHttpServer()).get(`/equipments`);

      expect(response.status).toBe(200);
    });

    it('should update a equipment', async () => {
      const equipmentResponse = await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload);

      expect(equipmentResponse.status).toBe(201);

      const equipmentId = equipmentResponse.body.id;

      const response = await request(app.getHttpServer())
        .patch(`/equipments/${equipmentId}`)
        .send(equipmentUpdatePayload);

      expect(response.status).toBe(200);
    });

    it('should delete a equipment', async () => {
      const equipmentResponse = await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload);

      expect(equipmentResponse.status).toBe(201);

      const equipmentId = equipmentResponse.body.id;

      const response = await request(app.getHttpServer()).delete(
        `/equipments/${equipmentId}`,
      );

      expect(response.status).toBe(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
