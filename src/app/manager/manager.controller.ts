import { Body, Controller, Post } from '@nestjs/common';

import { ManagerCreateRequest } from '@app/manager/dtos/manager-create.request';
import { ManagerService } from '@app/manager/manager.service';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  async joinManager(@Body() data: ManagerCreateRequest): Promise<boolean> {
    return this.managerService.joinManager(data);
  }
}
