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

  setCurrentNextbikes(nextbikeDTO: Observable<NextbikeDto[]>) {
    let nextbikes: NextbikeEntity[] = [];
    let nextbike = new NextbikeEntity();
    nextbikeDTO.subscribe(async (data: NextbikeDto[]) => {
      data.map((nextbike_entry: NextbikeEntity) => {
        (nextbike.id = nextbike_entry.id),
          (nextbike.location = nextbike_entry.location);
        nextbike.location_id = nextbike_entry.location_id;
        nextbike.timestamp = nextbike_entry.timestamp;
        nextbike.available_bikes = nextbike_entry.available_bikes;
        nextbike.booked_bikes = nextbike_entry.booked_bikes;
        nextbike.total_parking_spaces = nextbike_entry.total_parking_spaces;
        nextbike.available_parking_spaces =
          nextbike_entry.available_parking_spaces;
        nextbikes.push(nextbike);
      });
      this.repo.create(nextbikes);

      try {
        return await this.repo.save(nextbikes);
      } catch (error) {
        throw new InternalServerErrorException(
          'Something went wrong. Nextbike-Data not saved',
        );
      }
    });
  }
}
