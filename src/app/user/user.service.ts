import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';

import { UserCreateData } from '@app/user/commands/user-create.data';
import { User } from '@app/user/domain/user.entity';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import {
  DuplicatedNicknameException,
  DuplicatedUsernameException,
} from '@app/user/user.errors';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(data: UserCreateData): Promise<UserProfileResponse> {
    await Promise.all([
      this.validateUsername(data.username),
      this.validateNickname(data.nickname),
    ]);

    const { password, ...profile } = data;

    const hashedPassword = await argon2.hash(password, {
      secret: Buffer.from(this.configService.get<string>('APP_SECRET', '')),
    });

    const user = await this.userRepository.save({
      ...profile,
      password: hashedPassword,
    });

    return new UserProfileResponse(user);
  }

  protected async validateUsername(username: string): Promise<void> {
    const count = await this.userRepository.count({ where: { username } });

    if (count > 0) throw new DuplicatedUsernameException();
  }

  protected async validateNickname(nickname: string): Promise<void> {
    const count = await this.userRepository.count({ where: { nickname } });

    if (count > 0) throw new DuplicatedNicknameException();
  }

  async getUserProfile(username: string): Promise<UserProfileResponse> {
    const data = await this.userRepository.findOne({ where: { username } });
    console.log(data);
    return new UserProfileResponse(data);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.softDelete({ id });
    return result.affected > 0;
  }
}
