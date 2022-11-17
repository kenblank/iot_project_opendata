import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RiverDto } from 'src/DTO/river.dto';
import { RiversService } from './rivers.service';

@Controller('river')
export class RiversController {
  constructor(private readonly riversService: RiversService) {}

  @Get()
  getCurrentWaterlevel(): Observable<RiverDto> {
    return this.riversService.getCurrentWaterlevel();
  }

  @Post()
  setCurrentWaterlevel(
    @Body(ValidationPipe) data: Observable<RiverDto>,
  ): Promise<void> {
    return this.riversService.setCurrentWaterlevel(
      this.riversService.getCurrentWaterlevel(),
    );
  }
}
