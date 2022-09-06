import { IsNotEmpty, IsString } from 'class-validator';

import { ManualCreateCommand } from '@app/equipment/equipment-manual/equipment-manual.command';

export class ManualCreateRequest
  implements Omit<ManualCreateCommand, 'equipmentId'>
{
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  enTitle!: string;

  @IsNotEmpty()
  @IsString()
  type!: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs';

  @IsNotEmpty()
  @IsString()
  description!: string;
}
