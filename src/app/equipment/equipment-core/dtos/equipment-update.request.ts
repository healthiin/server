import { IsOptional, IsString } from 'class-validator';

import { EquipmentUpdateCommand } from '@app/equipment/equipment-core/equipment-core.command';

export class EquipmentUpdateRequest
  implements Omit<EquipmentUpdateCommand, 'equipmentId'>
{
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  enName?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
