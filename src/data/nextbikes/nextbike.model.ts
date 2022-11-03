export class Nextbike {
  constructor(
    public id: string,
    public timestamp: string,
    public location: string,
    public location_id: number,
    public available_bikes: number,
    public booked_bikes: number,
    public total_parking_spaces: number,
    public available_parking_spaces: number,
  ) {}
}
