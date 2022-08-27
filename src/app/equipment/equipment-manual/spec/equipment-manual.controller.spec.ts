import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { CreateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/create-equipment-core.request';
import { EquipmentCoreModule } from '@app/equipment/equipment-core/equipment-core.module';
import { CreateManualRequest } from '@app/equipment/equipment-manual/dtos/create-manual.request';
import { UpdateManualRequest } from '@app/equipment/equipment-manual/dtos/update-manual.request';
import { EquipmentManualModule } from '@app/equipment/equipment-manual/equipment-manual.module';
import { Equipment } from '@domain/equipment/entities/equipment.entity';
import { Manual } from '@domain/equipment/entities/manual.entity';

describe('Manuals', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        EquipmentCoreModule,
        EquipmentManualModule,
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

  describe('Manual Story', () => {
    const equipmentPayload: CreateEquipmentCoreRequest = {
      name: 'Equipment 1',
      description: 'Description 1',
    };

    const manualPayload: CreateManualRequest = {
      name: 'Manual',
      description: 'Manual Description',
    };

    const manualUpdatePayload: UpdateManualRequest = {
      name: 'Manual Updated',
      description: 'Manual Description Updated',
    };

    it('should create a manual by equipment', async () => {
      const equipmentResponse = await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload);

      expect(equipmentResponse.status).toBe(201);
      const equipmentId = equipmentResponse.body.id;

      const manualResponse = await request(app.getHttpServer())
        .post(`/manual/${equipmentId}`)
        .send(manualPayload);

      expect(manualResponse.status).toBe(201);
    });

    it('should get a manual by id', async () => {
      const equipmentResponse = await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload);

      expect(equipmentResponse.status).toBe(201);
      const equipmentId = equipmentResponse.body.id;

      const manualResponse = await request(app.getHttpServer())
        .post(`/manual/${equipmentId}`)
        .send(manualPayload)
        .expect(201);

      const manualId = manualResponse.body.id;

      const response = await request(app.getHttpServer()).get(
        `/manual/${manualId}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(manualId);
    });

    it('should get manuals by equipment', async () => {
      const equipmentResponse = await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload);

      expect(equipmentResponse.status).toBe(201);
      const equipmentId = equipmentResponse.body.id;

      await request(app.getHttpServer())
        .post(`/manual/${equipmentId}`)
        .send(manualPayload)
        .expect(201);
      await request(app.getHttpServer())
        .post(`/manual/${equipmentId}`)
        .send(manualPayload)
        .expect(201);

      const response = await request(app.getHttpServer()).get(
        `/manual/equipment/${equipmentId}`,
      );

      expect(response.status).toBe(200);
    });
    it('should get every manuals', async () => {
      const response = await request(app.getHttpServer()).get('/manual');

      expect(response.status).toBe(200);
    });

    it('should update equipment by id', async () => {
      const equipmentResponse = await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload);

      expect(equipmentResponse.status).toBe(201);
      const equipmentId = equipmentResponse.body.id;

      const manualResponse = await request(app.getHttpServer())
        .post(`/manual/${equipmentId}`)
        .send(manualPayload)
        .expect(201);

      const manualId = manualResponse.body.id;

      const response = await request(app.getHttpServer())
        .patch(`/manual/${manualId}`)
        .send(manualUpdatePayload);

      expect(response.status).toBe(200);
    });

    it('should delete equipment by id', async () => {
      const equipmentResponse = await request(app.getHttpServer())
        .post('/equipments')
        .send(equipmentPayload);

      expect(equipmentResponse.status).toBe(201);
      const equipmentId = equipmentResponse.body.id;

      const manualResponse = await request(app.getHttpServer())
        .post(`/manual/${equipmentId}`)
        .send(manualPayload)
        .expect(201);
      await request(app.getHttpServer());

      const manualId = manualResponse.body.id;

      const response = await request(app.getHttpServer()).delete(
        `/manual/${manualId}`,
      );

      expect(response.status).toBe(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
