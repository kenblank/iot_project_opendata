import { Controller, Get } from '@nestjs/common';
import { RiversService } from './rivers.service';

@Controller('river')
export class RiversController {
  constructor(private readonly riversService: RiversService) {}

  @Get()
  getCurrentWaterlevel() {
    return this.riversService.getCurrentWaterlevel();
  }
}
