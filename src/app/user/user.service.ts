import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';

import { UserCreateData } from '@app/user/commands/user-create.data';
import { User } from '@app/user/domain/user.entity';
import { UserProfileUpdateRequest } from '@app/user/dtos/user-profile-update.request';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import {
  DuplicatedNicknameException,
  DuplicatedUsernameException,
  UserNotFoundException,
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

  async getUserProfile(id: string): Promise<UserProfileResponse> {
    const data = await this.userRepository.findOne({ where: { id } });

    if (!data) throw new UserNotFoundException();
    return new UserProfileResponse(data);
  }

  async updateUserProfile(
    id: string,
    data: UserProfileUpdateRequest,
  ): Promise<UserProfileResponse> {
    await this.findUser(id);

    if (data.username) await this.validateUsername(data.username);

    if (data.nickname) await this.validateNickname(data.nickname);

    const updatedUserProfile = await this.userRepository.save({
      id,
      ...data,
    });

    return new UserProfileResponse(updatedUserProfile);
  }

  async updateUserPassword(id: string, password: string): Promise<boolean> {
    await this.findUser(id);

    const hashedPassword = await argon2.hash(Buffer.from(password), {
      secret: Buffer.from(this.configService.get<string>('APP_SECRET', '')),
    });

    await this.userRepository.save({ id, password: hashedPassword });

    return true;
  }

  async withdrawUser(id: string): Promise<boolean> {
    await this.findUser(id);

    const result = await this.userRepository.softDelete({ id });

    return result.affected > 0;
  }

  protected async findUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { id: true },
    });
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
