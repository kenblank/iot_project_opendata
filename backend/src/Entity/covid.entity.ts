import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('opendata_covid')
export class CovidEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  last_update: string;
  @Column()
  total_cases: number;
  @Column()
  total_deaths: number;
  @Column()
  incidence: number;
}
