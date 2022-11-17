import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CovidDto } from 'src/DTO/covid.dto';
import { CovidService } from './covid.service';

@Controller('covid')
export class CovidController {
  constructor(private readonly covidService: CovidService) {}

  @Get()
  getTodaysCovidData(): Observable<CovidDto> {
    return this.covidService.getTodaysCovidData();
  }

  @Post()
  setCurrentWaterlevel(@Body(ValidationPipe) data: Observable<CovidDto>): void {
    return this.covidService.setTodaysCovidData(
      this.covidService.getTodaysCovidData(),
    );
  }
}
