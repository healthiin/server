import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { Gym } from '@domain/gym/entities/gym.entity';
import { User } from '@domain/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Gym])],
  controllers: [UserController],
  providers: [UserService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
