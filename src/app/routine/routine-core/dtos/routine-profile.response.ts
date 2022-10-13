import { ApiProperty } from '@nestjs/swagger';

import { RoutineProperties } from '@domain/routine/routine';
import { Routine } from '@domain/routine/routine.entity';

export class RoutineProfileResponse
  implements
    Omit<
      RoutineProperties,
      'routineManuals' | 'author' | 'owner' | 'deletedAt' | 'day' | 'types'
    >
{
  @ApiProperty({ description: '루틴 id' })
  id!: string;

  @ApiProperty({ description: '루틴 제목' })
  title!: string;

  @ApiProperty({ description: '루틴 설명' })
  description!: string;

  @ApiProperty({ description: '루틴 작성자' })
  author!: string;

  @ApiProperty({ description: '루틴 소유자' })
  owner!: string;

  @ApiProperty({ description: '루틴 진행 날짜' })
  days!: number[];

  @ApiProperty({ description: '루틴 상태' })
  status!: 'public' | 'private';

  @ApiProperty({ description: '루틴 메뉴얼 ID 어레이' })
  manuals!: string[];

  @ApiProperty({ description: '루틴 타입 어레이' })
  types!: string[];

  @ApiProperty({ description: '루틴 생성일' })
  createdAt!: Date;

  @ApiProperty({ description: '루틴 업데이트일' })
  updatedAt!: Date;

  constructor(data: Routine & { days: number[] }) {
    Object.assign(this, data);
    this.author = data.author.nickname;
    this.owner = data.owner.nickname;
    this.manuals = data.routineManuals.map((manual) => manual.id);
    this.types = data.types.map((type) => type.type);
    this.days = data.days;
  }
}
