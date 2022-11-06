import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextbikeEntity } from 'src/Entity/nextbikes.entity';
import { NextbikesController } from './nextbikes.controller';
import { NextbikesService } from './nextbikes.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([NextbikeEntity])],
  controllers: [NextbikesController],
  providers: [NextbikesService],
})
export class NextbikesModule {}
