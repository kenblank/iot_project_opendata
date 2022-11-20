import { IsNotEmpty } from 'class-validator';

export class RiverDto {
  @IsNotEmpty()
  id: string;
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
