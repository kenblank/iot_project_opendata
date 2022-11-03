import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RiversController } from './rivers.controller';
import { RiversService } from './rivers.service';

@Module({
  imports: [HttpModule],
  controllers: [RiversController],
  providers: [RiversService],
})
export class RiversModule {}
