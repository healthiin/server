import { IsOptional, IsString } from 'class-validator';

import { ManualUpdateCommand } from '@app/equipment/equipment-manual/equipment-manual.command';

export class ManualUpdateRequest
  implements Omit<ManualUpdateCommand, 'manualId'>
{
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  enTitle?: string;

  @IsOptional()
  @IsString()
  type?: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs';

  @IsOptional()
  @IsString()
  equipmentId?: string;
}
