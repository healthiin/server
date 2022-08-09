import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { EquipmentCoreModule } from '@app/equipment/equipment-core/equipment-core.module';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';

describe('Equipments', () => {
  let app: INestApplication;
  const equipmentsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EquipmentCoreModule],
    })
      .overrideProvider(EquipmentCoreService)
      .useValue(equipmentsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET equipments`, () => {
    return request(app.getHttpServer()).get('/equipments').expect(200).expect({
      data: equipmentsService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
