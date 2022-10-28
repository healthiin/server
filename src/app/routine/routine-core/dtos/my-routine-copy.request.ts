import { ApiProperty } from '@nestjs/swagger';

import { RoutineCopyCommand } from '@app/routine/routine-core/routine.command';

export class MyRoutineCopyRequest implements Pick<RoutineCopyCommand, 'days'> {
  @ApiProperty({ description: 'days', example: [1, 1, 0, 0, 0, 0, 0] })
  days: number[];
}
