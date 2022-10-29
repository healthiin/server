import { ApiProperty } from '@nestjs/swagger';

import { RoutineResponseProperties } from '@app/routine/routine-core/routine.command';
import { ManualType } from '@domain/equipment/manual-type';

export class ReferenceRoutinePreviewResponse
  implements
    Pick<RoutineResponseProperties, 'id' | 'title' | 'types' | 'description'>
{
  @ApiProperty({ description: '루틴 ID' })
  id!: string;

  @ApiProperty({ description: '루틴 제목' })
  title!: string;

  @ApiProperty({
    description: '루틴에 대한 설명',
  })
  description!: string;

  @ApiProperty({
    description: '루틴 작성자 닉네임',
    example: '닉네임',
  })
  author!: string;

  @ApiProperty({
    description: '루틴에 포함된 운동 종류들',
    example: ['arm', 'legs'],
  })
  types!: ManualType[];

  constructor(
    data: Pick<
      RoutineResponseProperties,
      'id' | 'title' | 'author' | 'types' | 'description'
    >,
  ) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author.nickname;
    this.description = data.description;
    this.types = data.types;
  }
}
