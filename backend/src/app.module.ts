import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CovidModule } from 'src/Data/covid/covid.module';
import { NextbikesModule } from './Data/nextbikes/nextbikes.module';
import { RiversModule } from './Data/rivers/rivers.module';
import { CovidEntity } from './Entity/covid.entity';
import { NextbikeEntity } from './Entity/nextbikes.entity';
import { RiverEntity } from './Entity/river.entity';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'iwiliot-1.campus.fh-ludwigshafen.de',
  port: 3306,
  username: 'phpmyadmin',
  password: 'pw_phpmyadmin',
  database: 'MW350_IOT_W22',
  entities: [RiverEntity, CovidEntity, NextbikeEntity],
  synchronize: true,
};

@Module({
  imports: [
    RiversModule,
    CovidModule,
    NextbikesModule,
    TypeOrmModule.forRoot(ormOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
