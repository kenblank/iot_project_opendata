import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
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
  setInitialNextbikes(@Body(ValidationPipe) data: NextbikeDto[]) {
    return this.nextbikesService.setInitialNextbikes(of(data));
  }

  @Patch()
  updateNextbikes(@Body(ValidationPipe) data: NextbikeDto[]) {
    return this.nextbikesService.updateNextbikes(of(data));
  }
}
