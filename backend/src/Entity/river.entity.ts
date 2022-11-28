import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('opendata_river')
export class RiverEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  timestamp: string;
  @Column()
  name: string;
  @Column()
  station: string;
  @Column()
  waterlevel: number;
  @Column()
  unit: string;
}
