import { Controller } from '@nestjs/common';

import { GymService } from '@app/gym/gym.service';

@Controller('gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}
}
