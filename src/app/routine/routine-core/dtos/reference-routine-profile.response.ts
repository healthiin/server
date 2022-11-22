import { ApiProperty } from '@nestjs/swagger';

import { RoutineResponseProperties } from '@app/routine/routine-core/routine.command';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { ManualType } from '@domain/equipment/manual-type';

export class ReferenceRoutineProfileResponse
  implements
    Pick<
      RoutineResponseProperties,
      'id' | 'title' | 'description' | 'days' | 'types' | 'likeCount'
    >
{
  @ApiProperty({ description: '루틴 ID' })
  id!: string;

  @ApiProperty({ description: '루틴 제목' })
  title!: string;

  description!: string;

  @ApiProperty({
    description: '루틴을 진행할 요일',
    example: [1, 1, 0, 0, 0, 0, 0],
  })
  days!: number[];

  @ApiProperty({
    description: '루틴 작성자의 닉네임',
  })
  author!: string;

  @ApiProperty({
    description: '해당 루틴의 좋아요 수',
  })
  likeCount!: number;

  @ApiProperty({
    description: '루틴에 포함된 운동 종류들',
    example: ['arm', 'legs'],
  })
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
      | 'id'
      | 'title'
      | 'description'
      | 'days'
      | 'types'
      | 'routineManuals'
      | 'likeCount'
    >,
  ) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.likeCount = data.likeCount;
    this.days = data.days;
    this.types = [...new Set(data.types)];
    this.routineManuals = data.routineManuals;
  }
}
