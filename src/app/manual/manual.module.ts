import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManualController } from '@app/manual/manual.controller';
import { ManualService } from '@app/manual/manual.service';
import { Manual } from '@domain/manual/manual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manual])],
  controllers: [ManualController],
  providers: [ManualService],
})
export class ManualModule {}
