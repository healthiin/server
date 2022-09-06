import { IsNotEmpty, IsString } from 'class-validator';

import { EquipmentCreateCommand } from '@app/equipment/equipment-core/equipment-core.command';

export class EquipmentCreateRequest implements EquipmentCreateCommand {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  enName!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;
}
