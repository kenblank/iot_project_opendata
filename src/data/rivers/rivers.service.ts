import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { River } from './river.model';

@Injectable()
export class RiversService {
  private url: string =
    'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/MANNHEIM/W.json?includeCurrentMeasurement=true';

  constructor(private httpService: HttpService) {}

  getCurrentWaterlevel(): Observable<River> {
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
}
