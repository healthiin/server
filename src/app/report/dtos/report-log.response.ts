import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { RoutineLog } from '@domain/routine/routine-log.entity';

export class ReportLogResponse {
  @ApiProperty({ description: '기록 ID' })
  id: string;

  @ApiProperty({ description: '운동 이름' })
  title: string;

  @ApiProperty({ description: '세트 수' })
  setNumber: number;

  @ApiProperty({ description: '무게' })
  weight: number | null;

  @ApiProperty({ description: '부위' })
  type: string;

  @ApiProperty({ description: '운동 시작 시간' })
  startedAt: Date;

  @ApiProperty({ description: '운동 종료 시간' })
  endedAt: Date;

  @Exclude()
  day: number;

  constructor(data: RoutineLog) {
    this.id = data.id;
    this.day = data.startedAt.getDate();
    this.title = data.manual.manual.title;
    this.setNumber = data.setNumber;
    this.type = data.manual.manual.type;
    this.weight = data.weight || null;
    this.startedAt = data.startedAt;
    this.endedAt = data.endedAt;
  }
}
