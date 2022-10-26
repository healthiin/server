import { ApiProperty } from '@nestjs/swagger';

import { RoutineLog } from '@domain/routine/routine-log.entity';

export class RoutineLogProfileResponse {
  @ApiProperty({ description: '로그 아이디' })
  id: string;

  @ApiProperty({ description: '루틴 이름' })
  routineTitle!: string;

  @ApiProperty({ description: '목표 횟수' })
  targetNumber: number;

  @ApiProperty({ description: '실제 횟수' })
  setNumber: number;

  @ApiProperty({ description: '무게' })
  weight: number;

  @ApiProperty({ description: '속도' })
  speed: number;

  @ApiProperty({ description: '운동 시간' })
  playMinute: number;

  @ApiProperty({ description: '시작 시각' })
  startedAt: Date;

  @ApiProperty({ description: '종료 시각' })
  endedAt: Date;

  @ApiProperty({ description: '기록 시각' })
  createdAt: Date;

  @ApiProperty({ nullable: true })
  manualId: string | null;

  constructor(data: RoutineLog) {
    this.id = data.id;
    this.routineTitle = data.routine.title;
    this.targetNumber =
      Number(data.targetNumber) || Number(data.manual.targetNumber);
    this.setNumber = Number(data.setNumber) || Number(data.manual.setNumber);
    this.weight = Number(data.weight) || Number(data.manual.weight);
    this.speed = Number(data.speed) || Number(data.manual.speed);
    this.playMinute = Number(data.playMinute) || Number(data.manual.playMinute);
    this.startedAt = data.startedAt;
    this.endedAt = data.endedAt;
    this.createdAt = data.createdAt;

    if (data.manual) {
      this.manualId = data.manual.id;
    }
  }
}
