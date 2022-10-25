import { ApiProperty } from '@nestjs/swagger';

import { RoutineProfileProperties } from '@app/routine/routine-core/routine.command';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';

export class RoutineProfileResponse
  implements
    Omit<
      RoutineProfileProperties,
      'author' | 'owner' | 'types' | 'day' | 'logs' | 'deletedAt'
    >
{
  @ApiProperty({
    description: '루틴 id',
    example: 'e879a461-9d7d-4144-b7c9-385f73e6253c',
  })
  id!: string;

  @ApiProperty({ description: '루틴 제목', example: '상체 겁나쉬운 루틴' })
  title!: string;

  @ApiProperty({
    description: '루틴 설명',
    example: '상체 겁나 쉬운 루틴에 대한 설명입니다.',
  })
  description!: string;

  @ApiProperty({
    description: '루틴 작성자 닉네임',
    example: '루틴 작성자 닉네임',
  })
  author!: string;

  @ApiProperty({
    description: '루틴 소유자 닉네임',
    example: '루틴 소유자 닉네임',
  })
  owner!: string;

  @ApiProperty({
    description: '루틴 진행 날짜',
    example: [1, 1, 0, 0, 0, 0, 0],
  })
  days!: number[];

  @ApiProperty({
    description: '루틴 상태',
    default: 'public',
    example: 'public',
  })
  status!: 'public' | 'private';

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

  @ApiProperty({ description: '루틴 타입 어레이', example: ['arm', 'legs'] })
  types!: string[];

  @ApiProperty({ description: '루틴 생성일', type: Date, example: new Date() })
  createdAt!: Date;

  @ApiProperty({
    description: '루틴 업데이트일',
    type: Date,
    example: new Date(),
  })
  updatedAt!: Date;

  constructor(data: RoutineProfileProperties) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.author = data.author.nickname;
    this.owner = data.owner.nickname;
    this.routineManuals = data.routineManuals;
    this.types = data.types;
    this.days = data.days;
  }
}
