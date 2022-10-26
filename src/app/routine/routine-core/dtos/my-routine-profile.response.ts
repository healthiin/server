import { ApiProperty } from '@nestjs/swagger';

import { RoutineResponseProperties } from '@app/routine/routine-core/routine.command';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { ManualType } from '@domain/equipment/manual-type';

export class MyRoutineProfileResponse
  implements Pick<RoutineResponseProperties, 'id' | 'title' | 'days'>
{
  @ApiProperty({
    description: '루틴 id',
    example: 'e879a461-9d7d-4144-b7c9-385f73e6253c',
  })
  id!: string;

  @ApiProperty({ description: '루틴 제목', example: '상체 겁나쉬운 루틴' })
  title!: string;

  @ApiProperty({
    description: '루틴 진행 날짜',
    example: [1, 1, 0, 0, 0, 0, 0],
  })
  days!: number[];

  @ApiProperty({ description: '루틴 타입 어레이', example: ['arm', 'legs'] })
  types!: ManualType[];

  @ApiProperty({
    description: '루틴 메뉴얼 어레이, 첫 생성 시에는 비어있습니다.',
    example: [
      {
        manualId: 'e879a461-9d7d-4144-b7c9-385f73e6253c',
        targetNumber: 10,
        setNumber: 3,
        weight: 20,
        speed: null,
        playMinute: null,
        order: 1,
        type: 'arm',
      },
      {
        manualId: 'edf9a461-9d7d-4144-b7c9-385f73e6253c',
        targetNumber: 10,
        setNumber: 3,
        weight: 15,
        speed: null,
        playMinute: null,
        order: 2,
        type: 'legs',
      },
    ],
  })
  routineManuals!: RoutineManualProfileResponse[];

  constructor(
    data: Pick<
      RoutineResponseProperties,
      'id' | 'title' | 'routineManuals' | 'types' | 'days'
    >,
  ) {
    this.id = data.id;
    this.title = data.title;
    this.routineManuals = data.routineManuals;
    this.types = data.types;
    this.days = data.days;
  }
}
