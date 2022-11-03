import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NextbikesController } from './nextbikes.controller';
import { NextbikesService } from './nextbikes.service';

@Module({
  imports: [HttpModule],
  controllers: [NextbikesController],
  providers: [NextbikesService],
})
export class NextbikesModule {}
