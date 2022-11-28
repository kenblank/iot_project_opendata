import { IsNotEmpty } from 'class-validator';

export class CovidDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  last_update: string;
  @IsNotEmpty()
  total_cases: number;
  @IsNotEmpty()
  total_deaths: number;
  @IsNotEmpty()
  incidence: number;
}
