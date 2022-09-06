import { ApiProperty } from '@nestjs/swagger';

import { EquipmentProperties } from '@domain/equipment/equipment';
import { Equipment } from '@domain/equipment/equipment.entity';

export class EquipmentProfileResponse
  implements
    Omit<EquipmentProperties, 'manuals' | 'gymEquipment' | 'deletedAt'>
{
  @ApiProperty()
  id!: string;

  @ApiProperty({ description: '기구명' })
  name!: string;

  @ApiProperty({ description: '기구 영어명' })
  enName!: string;

  @ApiProperty({ description: '운동에 대한 설명' })
  description!: string | null;

  @ApiProperty({ description: '게시글 작성 일시' })
  createdAt!: Date;

  @ApiProperty({ description: '게시글 수정 일시' })
  updatedAt!: Date;

  constructor(data: Equipment) {
    Object.assign(this, data);
  }
}
