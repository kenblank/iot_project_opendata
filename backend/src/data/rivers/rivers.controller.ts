import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Observable, of } from 'rxjs';
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
  setCurrentWaterlevel(@Body(ValidationPipe) data: RiverDto): void {
    return this.riversService.setCurrentWaterlevel(of(data));
  }
}
