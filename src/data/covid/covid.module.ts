import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CovidEntity } from 'src/Entity/covid.entity';
import { CovidController } from './covid.controller';
import { CovidService } from './covid.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([CovidEntity])],
  controllers: [CovidController],
  providers: [CovidService],
})
export class CovidModule {}
