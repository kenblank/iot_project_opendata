import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CovidModule } from './data/covid/covid.module';
import { NextbikesModule } from './data/nextbikes/nextbikes.module';
import { RiversModule } from './data/rivers/rivers.module';

@Module({
  imports: [RiversModule, CovidModule, NextbikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
