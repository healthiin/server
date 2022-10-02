import { ApiProperty } from '@nestjs/swagger';

import { ManualProperties } from '@domain/equipment/equipment-manual';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { ManualType } from '@domain/equipment/equipment-type';

export class ManualProfileResponse
  implements Omit<ManualProperties, 'equipment' | 'routine' | 'deletedAt'>
{
  @ApiProperty()
  id!: string;

  @ApiProperty({ description: '운동 명' })
  title!: string;

  @ApiProperty({ description: '운동 영명' })
  enTitle!: string;

  @ApiProperty({ description: '운동에 대한 설명' })
  description!: string | null;

  @ApiProperty({ description: '운동 부위' })
  type!: ManualType;

  equipmentId!: string;

  @ApiProperty({ description: '운동설명 생성일시' })
  createdAt!: Date;

  @ApiProperty({ description: '운동설명 수정일시' })
  updatedAt!: Date;

  constructor(data: Manual) {
    Object.assign(this, data);
  }
}
