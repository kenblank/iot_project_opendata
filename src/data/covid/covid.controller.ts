import { Controller, Get } from '@nestjs/common';
import { CovidService } from './covid.service';

@Controller('covid')
export class CovidController {
  constructor(private readonly covidService: CovidService) {}

  @Get()
  getTodaysCovidData() {
    return this.covidService.getTodaysCovidData();
  }
}
