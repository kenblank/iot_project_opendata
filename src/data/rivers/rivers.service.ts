import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { RiverDto } from 'src/DTO/river.dto';
import { RiverEntity } from 'src/Entity/river.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
        timestamp: data.currentMeasurement.timestamp,
        name: 'Rhein',
        station: 'Ludwigshafen am Rhein',
        waterlevel: data.currentMeasurement.value,
        unit: data.unit,
      })),
    );
  }

  setCurrentWaterlevel(riverDTO: Observable<RiverDto>): void {
    riverDTO.subscribe(async (data: RiverDto) => {
      try {
        return await this.repo.insert({
          id: data.id,
          name: data.name,
          station: data.station,
          timestamp: data.timestamp,
          unit: data.unit,
          waterlevel: data.waterlevel,
        });
      } catch (error) {
        throw new InternalServerErrorException(
          'Something went wrong. River-Data not saved',
        );
      }
    });
  }
}
