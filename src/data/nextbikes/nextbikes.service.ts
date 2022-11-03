import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Nextbike } from './nextbike.model';

@Injectable()
export class NextbikesService {
  private url: string =
    'https://mannheim.opendatasoft.com/api/records/1.0/search/?dataset=free_bike_status&q=&rows=50';

  constructor(private httpService: HttpService) {}

  getCurrentNextbikes(): Observable<Nextbike[]> {
    return this.httpService.get(this.url).pipe(
      map((response) => response.data),
      map((data) => data.records),
      map((records) =>
        records.map((record) => ({
          id: record.recordid,
          timestamp: record.record_timestamp,
          location: record.fields.name,
          location_id: record.fields.uid,
          available_bikes: record.fields.bikes,
          booked_bikes: record.fields.booked_bikes,
          total_parking_spaces: record.fields.bike_racks,
          available_parking_spaces: record.fields.free_special_racks,
        })),
      ),
    );
  }
}
