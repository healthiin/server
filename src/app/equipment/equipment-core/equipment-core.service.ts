import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import {
  EquipmentCreateCommand,
  EquipmentDeleteCommand,
  EquipmentUpdateCommand,
} from '@app/equipment/equipment-core/equipment-core.command';
import { Equipment } from '@domain/equipment/equipment.entity';
import {
  EquipmentNotFoundException,
  QrGenerationFailedException,
} from '@domain/equipment/equipment.errors';

export class EquipmentCoreService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async getEquipments(): Promise<EquipmentProfileResponse[]> {
    const equipments = await this.equipmentRepository.find();

    return equipments.map(
      (equipment) => new EquipmentProfileResponse(equipment),
    );
  }

  async getEquipmentById(
    id: string,
    select?: FindOptionsSelect<Equipment>,
  ): Promise<Equipment> {
    const equipment = await this.equipmentRepository.findOne({
      where: { id },
      select,
    });
    if (!equipment) {
      throw new EquipmentNotFoundException();
    }
    return equipment;
  }

  async createEquipment(data: EquipmentCreateCommand): Promise<Equipment> {
    const equipment = await this.equipmentRepository.save({
      ...data,
    });

    return await this.equipmentRepository.save({
      ...equipment,
      qrUrl: await this.generateQrCodeByEquipmentId(equipment.id),
    });
  }

  async updateEquipment(data: EquipmentUpdateCommand): Promise<Equipment> {
    const equipment = await this.getEquipmentById(data.equipmentId);

    return this.equipmentRepository.save({
      ...equipment,
      ...data,
    });
  }

  async generateQrCodeByEquipmentId(id: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QRCode = require('qrcode');

    const qrUrl = QRCode.toDataURL(`${id}`);
    if (!qrUrl) {
      throw new QrGenerationFailedException();
    }
    return qrUrl;
  }

  async deleteEquipment(data: EquipmentDeleteCommand): Promise<boolean> {
    const equipment = await this.getEquipmentById(data.equipmentId);
    const { affected } = await this.equipmentRepository.softDelete({
      id: equipment.id,
    });
    return affected > 0;
  }
}
