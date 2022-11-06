import { IsNotEmpty } from 'class-validator';

export class RiverDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  timestamp: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  station: string;
  @IsNotEmpty()
  waterlevel: number;
  @IsNotEmpty()
  unit: string;
}
