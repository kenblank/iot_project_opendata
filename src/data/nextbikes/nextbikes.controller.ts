import { Controller, Get } from '@nestjs/common';
import { NextbikesService } from './nextbikes.service';

@Controller('nextbikes')
export class NextbikesController {
  constructor(private readonly nextbikesService: NextbikesService) {}

  @Get()
  getCurrentNextbikes() {
    return this.nextbikesService.getCurrentNextbikes();
  }
}
