import { ApiProperty } from '@nestjs/swagger';

import { ManualProperties } from '@domain/equipment/equipment-manual';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { ManualType } from '@domain/equipment/manual-type';

export class ManualProfileResponse
  implements
    Omit<ManualProperties, 'equipment' | 'routineManual' | 'deletedAt'>
{
  @ApiProperty()
  id!: string;

  @ApiProperty({ description: '운동 명' })
  title!: string;

  @ApiProperty({ description: '운동 영명' })
  enTitle!: string;

  @ApiProperty({ description: '운동에 대한 설명' })
  description!: string | null;

  @ApiProperty({ description: '운동에 대한 주의사항' })
  precaution!: string | null;

  @ApiProperty({ description: '운동의 사용 기구 ID' })
  equipmentId!: string;

  @ApiProperty({ description: '운동의 사용 기구 명칭' })
  equipmentTitle!: string;

  @ApiProperty({ description: '운동의 사용 기구 영어 명칭' })
  equipmentEnTitle!: string;

  @ApiProperty({ description: '운동에 대한 설명 이미지 URL' })
  imageUrl!: string | null;

  @ApiProperty({ description: '운동에 대한 설명 영상 URL' })
  videoUrl!: string | null;

  @ApiProperty({ description: '운동 부위' })
  type!: ManualType;

  @ApiProperty({ description: '운동설명 생성일시' })
  createdAt!: Date;

  @ApiProperty({ description: '운동설명 수정일시' })
  updatedAt!: Date;

  constructor(data: Manual) {
    Object.assign(this, data);
    this.equipmentId = data.equipment.id;
    this.equipmentTitle = data.equipment.name;
    this.equipmentEnTitle = data.equipment.enName;
  }
}
