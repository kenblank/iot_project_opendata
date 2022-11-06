import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiverEntity } from 'src/Entity/river.entity';
import { RiversController } from './rivers.controller';
import { RiversService } from './rivers.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([RiverEntity])],
  controllers: [RiversController],
  providers: [RiversService],
})
export class RiversModule {}
