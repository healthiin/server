import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';

import { ManagerCreateData } from '@app/manager/command/manager-create.data';
import { Manager } from '@domain/manager/manager.entity';

export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerServiceRepository: Repository<Manager>,
    private readonly configService: ConfigService,
  ) {}

  async joinManager(data: ManagerCreateData): Promise<boolean> {
    await this.managerServiceRepository.save({
      ...data,
      password: await this.hashPassword(data.password),
    });
    return true;
  }

  protected async hashPassword(password: string): Promise<string> {
    const secret = Buffer.from(
      this.configService.get<string>('APP_SECRET', ''),
    );
    return argon2.hash(password, { secret });
  }
}
