import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceConfig } from './data-source';

import { AppModule } from '@app/app.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot(dataSourceConfig),
    EventEmitterModule.forRoot(),
    AppModule,
    InfrastructureModule,
  ],
})
export class MainModule {}
