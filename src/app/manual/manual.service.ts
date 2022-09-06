import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { ManualCreateData } from '@app/manual/commands/manual-create.data';
import { ManualPreviewResponse } from '@app/manual/dtos/manual-preview.response';
import { ManualUpdateRequest } from '@app/manual/dtos/manual-update.request';
import { ManualResponse } from '@app/manual/dtos/manual.response';
import { Manual } from '@domain/manual/manual.entity';
import { ManualNotFoundExeption } from '@domain/manual/manual.errors';

export class ManualService {
  constructor(
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
  ) {}

  async getAllManuals(): Promise<ManualPreviewResponse[]> {
    const manuals = await this.manualRepository.find();

    return manuals.map((manual) => new ManualPreviewResponse(manual));
  }

  async getManualsByType(
    type: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs',
  ): Promise<ManualPreviewResponse[]> {
    const manuals = await this.manualRepository.findBy({ type });

    return manuals.map((manual) => new ManualPreviewResponse(manual));
  }

  async getManualById(id: string): Promise<ManualResponse> {
    const manual = await this.manualRepository.findOne({ where: { id } });

    return new ManualResponse(manual);
  }

  async createManual(
    equipmentId: string,
    data: ManualCreateData,
  ): Promise<string> {
    const manual = await this.manualRepository.save({
      ...data,
      equipment: { id: equipmentId },
    });

    return manual.id;
  }

  async updateManual(id: string, data: ManualUpdateRequest): Promise<string> {
    const manual = await this.findById(id);

    const updatedManual = await this.manualRepository.save({
      ...manual,
      ...data,
    });

    return updatedManual.id;
  }

  async withdrawManual(id: string): Promise<boolean> {
    const manual = await this.findById(id);

    const { affected } = await this.manualRepository.softDelete(manual.id);

    return affected > 0;
  }

  async findById(
    id: string,
    select?: FindOptionsSelect<Manual>,
  ): Promise<Manual> {
    const manual = await this.manualRepository.findOne({
      where: { id },
      select,
    });

    if (!manual) throw new ManualNotFoundExeption();

    return manual;
  }
}
