import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceConfig), AppModule],
})
export class MainModule {}
