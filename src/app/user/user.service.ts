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
  ValidationUUIDException,
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
    await this.userPresenceCheck(id);
    const data = await this.userRepository.findOne({ where: { id } });
    return new UserProfileResponse(data);
  }

  async withdrawUser(id: string): Promise<boolean> {
    await this.userPresenceCheck(id);
    const result = await this.userRepository.softDelete({ id });
    return result.affected > 0;
  }

  protected async userPresenceCheck(id: string): Promise<void> {
    try {
      await this.userRepository.findOneOrFail({ where: { id } });
    } catch (e) {
      throw new ValidationUUIDException();
    }
  }

  async updateUserProfile(
    id: string,
    updatedData: UserProfileUpdateRequest,
  ): Promise<UserProfileResponse> {
    await this.userPresenceCheck(id);
    await Promise.all([
      this.validateUsername(updatedData.username),
      this.validateNickname(updatedData.nickname),
    ]);
    const updatedUserProfile = await this.userRepository.save({
      id,
      ...updatedData,
    });

    return new UserProfileResponse(updatedUserProfile);
  }
  async updateUserPassword(id: string, password: string): Promise<boolean> {
    await this.userPresenceCheck(id);

    const hashedPassword = await argon2.hash(Buffer.from(password), {
      secret: Buffer.from(this.configService.get<string>('APP_SECRET', '')),
    });

    await this.userRepository.save({ id, password: hashedPassword });
    return true;
  }
}
