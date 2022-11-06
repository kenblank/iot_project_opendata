import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { RiverDto } from 'src/DTO/river.dto';
import { RiverEntity } from 'src/Entity/river.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiversService {
  private url: string =
    'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/MANNHEIM/W.json?includeCurrentMeasurement=true';

  constructor(
    private httpService: HttpService,
    @InjectRepository(RiverEntity) private repo: Repository<RiverEntity>,
  ) {}

  getCurrentWaterlevel(): Observable<RiverDto> {
    return this.httpService.get(this.url).pipe(
      map((response) => response.data),
      map((data) => ({
        id: 1,
        timestamp: data.currentMeasurement.timestamp,
        name: 'Rhein',
        station: 'Ludwigshafen am Rhein',
        waterlevel: data.currentMeasurement.value,
        unit: data.unit,
      })),
    );
  }

  async setCurrentWaterlevel(riverDTO: Observable<RiverDto>) {
    let river: RiverEntity = new RiverEntity();
    riverDTO.subscribe(async (data: RiverDto) => {
      river.id = data.id;
      river.name = data.name;
      river.station = data.station;
      river.timestamp = data.timestamp;
      river.unit = data.unit;
      river.waterlevel = data.waterlevel;

      console.log(river);

      this.repo.create(river);

      try {
        return await this.repo.save(river);
      } catch (error) {
        throw new InternalServerErrorException(
          'Something went wrong. River-Data not saved',
        );
      }
    });
  }
}
