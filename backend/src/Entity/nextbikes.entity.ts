import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('opendata_nextbike')
export class NextbikeEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  timestamp: string;
  @Column()
  location: string;
  @Column()
  location_id: number;
  @Column()
  available_bikes: number;
  @Column()
  booked_bikes: number;
  @Column()
  total_parking_spaces: number;
  @Column()
  available_parking_spaces: number;
}
