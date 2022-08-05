import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GymUserService } from '@app/gym/gym-user/gym-user.service';

@Controller('gyms/:gymId/users')
@ApiTags('Gym User')
export class GymUserController {
  constructor(private readonly gymUserService: GymUserService) {}
}
