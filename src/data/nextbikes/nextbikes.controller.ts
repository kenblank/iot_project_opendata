import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CovidDto } from 'src/DTO/covid.dto';
import { NextbikeDto } from 'src/DTO/nextbike.dto';
import { NextbikesService } from './nextbikes.service';

@Controller('nextbikes')
export class NextbikesController {
  constructor(private readonly nextbikesService: NextbikesService) {}

  @Get()
  getCurrentNextbikes(): Observable<NextbikeDto[]> {
    return this.nextbikesService.getCurrentNextbikes();
  }

  @Post()
  setInitialNextbikes(@Body(ValidationPipe) data: Observable<CovidDto>) {
    return this.nextbikesService.setInitialNextbikes(
      this.nextbikesService.getCurrentNextbikes(),
    );
  }

  @Patch()
  updateNextbikes(@Body(ValidationPipe) data: Observable<CovidDto>) {
    return this.nextbikesService.updateNextbikes(
      this.nextbikesService.getCurrentNextbikes(),
    );
  }
}
