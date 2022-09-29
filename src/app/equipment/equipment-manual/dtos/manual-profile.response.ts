import { ApiProperty } from '@nestjs/swagger';

import { ManualType } from '@app/equipment/equipment-manual/dtos/manual-create.request';
import { ManualProperties } from '@domain/equipment/equipment-manual';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { Equipment } from '@domain/equipment/equipment.entity';

export class ManualProfileResponse
  implements Omit<ManualProperties, 'routine' | 'deletedAt'>
{
  @ApiProperty()
  id!: string;

  @ApiProperty({ description: '운동 명' })
  title!: string;

  @ApiProperty({ description: '운동 영명' })
  enTitle!: string;

  @ApiProperty({ description: '운동에 대한 설명' })
  description!: string | null;

  @ApiProperty({ description: '운동에 대한 주의점' })
  precautions!: string | null;

  @ApiProperty({ description: '운동 부위' })
  type!: ManualType;

  @ApiProperty({ description: '운동 장비' })
  equipment!: Equipment;

  @ApiProperty({ description: '운동설명 생성일시' })
  createdAt!: Date;

  @ApiProperty({ description: '운동설명 수정일시' })
  updatedAt!: Date;

  constructor(data: Manual) {
    Object.assign(this, data);
  }
}
