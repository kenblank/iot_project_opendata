export class River {
  constructor(
    public id: number,
    public timestamp: string,
    public name: string,
    public station: string,
    public waterlevel: number,
    public unit: string,
  ) {}
}
