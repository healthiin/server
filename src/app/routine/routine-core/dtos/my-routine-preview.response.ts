import { ApiProperty } from '@nestjs/swagger';

import { RoutineResponseProperties } from '@app/routine/routine-core/routine.command';
import { ManualType } from '@domain/equipment/manual-type';

export class MyRoutinePreviewResponse
  implements Pick<RoutineResponseProperties, 'id' | 'title' | 'types' | 'days'>
{
  @ApiProperty({ description: '루틴 ID' })
  id!: string;

  @ApiProperty({ description: '루틴 제목' })
  title!: string;

  @ApiProperty({
    description: '루틴을 진행할 요일',
    example: [1, 1, 0, 0, 0, 0, 0],
  })
  days!: number[];

  @ApiProperty({
    description: '루틴에 포함된 운동 종류들',
    example: ['arm', 'legs'],
  })
  types!: ManualType[];

  constructor(
    data: Pick<RoutineResponseProperties, 'id' | 'title' | 'types' | 'days'>,
  ) {
    this.id = data.id;
    this.title = data.title;
    this.days = data.days;
    this.types = [...new Set(data.types)];
  }
}
