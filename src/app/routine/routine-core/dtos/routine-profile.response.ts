import { ApiProperty } from '@nestjs/swagger';

import {
  routineManualType,
  RoutineProfileProperties,
} from '@app/routine/routine-core/routine.command';

export class RoutineProfileResponse
  implements
    Omit<
      RoutineProfileProperties,
      'author' | 'owner' | 'types' | 'day' | 'logs' | 'deletedAt'
    >
{
  @ApiProperty({ description: '루틴 id' })
  id!: string;

  @ApiProperty({ description: '루틴 제목' })
  title!: string;

  @ApiProperty({ description: '루틴 설명' })
  description!: string;

  @ApiProperty({ description: '루틴 작성자 닉네임' })
  author!: string;

  @ApiProperty({ description: '루틴 소유자 닉네임' })
  owner!: string;

  @ApiProperty({ description: '루틴 진행 날짜' })
  days!: number[];

  @ApiProperty({ description: '루틴 상태', default: 'public' })
  status!: 'public' | 'private';

  @ApiProperty({ description: '루틴 메뉴얼 어레이' })
  routineManuals!: any[]; //routineManualType[];

  @ApiProperty({ description: '루틴 타입 어레이' })
  types!: string[];

  @ApiProperty({ description: '루틴 생성일' })
  createdAt!: Date;

  @ApiProperty({ description: '루틴 업데이트일' })
  updatedAt!: Date;

  constructor(data: RoutineProfileProperties) {
    this.title = data.title;
    this.description = data.description;
    this.author = data.author.nickname;
    this.owner = data.owner.nickname;
    this.routineManuals = data.routineManuals;
    this.types = data.types;
    this.days = data.days;
  }
}
