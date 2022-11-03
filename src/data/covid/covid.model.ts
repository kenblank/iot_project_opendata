export class Covid {
  constructor(
    public id: string,
    public last_update: string,
    public total_cases: number,
    public total_deaths: number,
    public incidence: number,
  ) {}
}
