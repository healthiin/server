import { ApiProperty } from '@nestjs/swagger';

import { ManualType } from '@domain/equipment/manual-type';
import { RoutineManualProperties } from '@domain/routine/routine-manual';

export class RoutineManualProfileResponse
  implements
    Omit<
      RoutineManualProperties,
      'manual' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'routine'
    >
{
  @ApiProperty({
    description: '루틴 메뉴얼 ID',
  })
  id!: string;

  @ApiProperty({ description: '메뉴얼 ID' })
  manualId!: string;

  @ApiProperty({ description: '메뉴얼 제목' })
  manualTitle!: string;

  @ApiProperty({ description: '루틴 메뉴얼 ID' })
  routineManualId!: string;

  @ApiProperty({ description: '근력운동 세트 당 횟수' })
  targetNumber!: number;

  @ApiProperty({ description: '근력운동 세트 수' })
  setNumber!: number;

  @ApiProperty({ description: '근력운동 무게' })
  weight!: number;

  @ApiProperty({ description: '유산소운동 속도' })
  speed!: number;

  @ApiProperty({ description: '유산소운동 시간' })
  playMinute!: number;

  @ApiProperty({ description: '운동 정렬 순서' })
  order!: number;

  @ApiProperty({ description: '운동 종류', enum: ManualType })
  type!: ManualType;

  constructor(
    data: Omit<
      RoutineManualProperties,
      'createdAt' | 'updatedAt' | 'deletedAt' | 'routine'
    >,
  ) {
    this.routineManualId = data.id;
    this.manualId = data.manual.id;
    this.manualTitle = data.manual.title;
    this.targetNumber = data.targetNumber || null;
    this.setNumber = data.setNumber || null;
    this.weight = data.weight || null;
    this.speed = data.speed || null;
    this.playMinute = data.playMinute || null;
    this.order = data.order;
    this.type = data.manual.type;
  }
}
