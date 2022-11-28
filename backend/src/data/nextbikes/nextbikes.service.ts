import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { NextbikeDto } from 'src/DTO/nextbike.dto';
import { NextbikeEntity } from 'src/Entity/nextbikes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NextbikesService {
  private url: string =
    'https://mannheim.opendatasoft.com/api/records/1.0/search/?dataset=free_bike_status&q=&rows=50';

  constructor(
    private httpService: HttpService,
    @InjectRepository(NextbikeEntity) private repo: Repository<NextbikeEntity>,
  ) {}

  getCurrentNextbikes(): Observable<NextbikeDto[]> {
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

  setInitialNextbikes(nextbikeDTO: Observable<NextbikeDto[]>): void {
    nextbikeDTO.subscribe((data: NextbikeDto[]) => {
      data.map(async (nextbike_entry: NextbikeDto) => {
        try {
          await this.repo.insert({
            id: nextbike_entry.id,
            timestamp: nextbike_entry.timestamp,
            location: nextbike_entry.location,
            location_id: nextbike_entry.location_id,
            available_bikes: nextbike_entry.available_bikes,
            booked_bikes: nextbike_entry.booked_bikes,
            total_parking_spaces:
              nextbike_entry?.total_parking_spaces !== undefined
                ? nextbike_entry.total_parking_spaces
                : 0,
            available_parking_spaces:
              nextbike_entry?.available_parking_spaces !== undefined
                ? nextbike_entry.available_parking_spaces
                : 0,
          });
        } catch (error) {
          console.log('Something went wrong. Nextbikes-Data not saved');
        }
      });
    });
  }

  updateNextbikes(nextbikeDTO: Observable<NextbikeDto[]>): void {
    nextbikeDTO.subscribe((data: NextbikeDto[]) => {
      data.map(async (nextbike_entry: NextbikeDto) => {
        try {
          this.repo.update(
            { id: nextbike_entry.id },
            {
              timestamp: nextbike_entry.timestamp,
              available_bikes: nextbike_entry.available_bikes,
              booked_bikes: nextbike_entry.booked_bikes,
              total_parking_spaces:
                nextbike_entry?.total_parking_spaces !== undefined
                  ? nextbike_entry.total_parking_spaces
                  : 0,
              available_parking_spaces:
                nextbike_entry?.available_parking_spaces !== undefined
                  ? nextbike_entry.available_parking_spaces
                  : 0,
            },
          );
        } catch (error) {
          console.log('Something went wrong. Nextbikes-Data not saved');
        }
      });
    });
  }
}
