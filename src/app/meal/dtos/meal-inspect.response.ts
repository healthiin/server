import { ApiProperty } from '@nestjs/swagger';

import { MealInspectResult } from '@app/meal/dtos/meal-inspect-result';

export class MealInspectResponse {
  @ApiProperty({ description: '음식 사진 ID' })
  photoId: string;

  @ApiProperty({ type: [MealInspectResult] })
  results: MealInspectResult[];
}
