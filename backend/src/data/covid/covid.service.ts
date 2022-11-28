import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map, Observable, of } from 'rxjs';
import { CovidDto } from 'src/DTO/covid.dto';
import { CovidEntity } from 'src/Entity/covid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CovidService {
  private url: string =
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=ludwigshafen&facet=last_update&facet=name&facet=rs&facet=bez&facet=bl&refine.name=Ludwigshafen+am+Rhein';
  private url_replacement: string =
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=mannheim&sort=cases7_per_100k&facet=last_update&facet=name&facet=rs&facet=bez&facet=bl';
  constructor(
    private httpService: HttpService,
    @InjectRepository(CovidEntity) private repo: Repository<CovidEntity>,
  ) {}

  getTodaysCovidData(): Observable<CovidDto> | Observable<undefined> {
    return this.httpService.get(this.url_replacement).pipe(
      map((response) => response.data),
      map((data) => ({
        id: data.records[0].recordid,
        last_update: data.records[0].fields.last_update,
        total_cases: data.records[0].fields.cases,
        total_deaths: data.records[0].fields.deaths,
        incidence: data.records[0].fields.cases7_per_100k,
      })),
      catchError((error) => {
        return of(undefined);
      }),
    );
  }

  setTodaysCovidData(covidDto: Observable<CovidDto>): void {
    covidDto.subscribe(async (data: CovidDto) => {
      try {
        return await this.repo.insert({
          id: data.id,
          last_update: data.last_update,
          total_cases: data.total_cases,
          total_deaths: data.total_deaths,
          incidence: data.incidence,
        });
      } catch (error) {
        console.log('Something went wrong. Covid-Data not saved');
      }
    });
  }
}
