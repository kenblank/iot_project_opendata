import { IsNotEmpty } from 'class-validator';

export class NextbikeDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  timestamp: string;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  location_id: number;
  @IsNotEmpty()
  available_bikes: number;
  @IsNotEmpty()
  booked_bikes: number;
  @IsNotEmpty()
  total_parking_spaces: number;
  @IsNotEmpty()
  available_parking_spaces: number;
}
