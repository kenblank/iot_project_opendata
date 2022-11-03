import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Covid } from './covid.model';

@Injectable()
export class CovidService {
  private url: string =
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=ludwigshafen&facet=last_update&facet=name&facet=rs&facet=bez&facet=bl&refine.name=Ludwigshafen+am+Rhein';

  constructor(private httpService: HttpService) {}

  getTodaysCovidData(): Observable<Covid> {
    return this.httpService.get(this.url).pipe(
      map((response) => response.data),
      map((data) => ({
        id: data.records[0].recordid,
        last_update: data.records[0].fields.last_update,
        total_cases: data.records[0].fields.cases,
        total_deaths: data.records[0].fields.deaths,
        incidence: data.records[0].fields.cases7_per_100k,
      })),
    );
  }
}
