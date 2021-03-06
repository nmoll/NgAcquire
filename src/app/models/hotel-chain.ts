export enum HotelChainType {
  WORLDWIDE = "WORLDWIDE",
  LUXOR = "LUXOR",
  FESTIVAL = "FESTIVAL",
  IMPERIAL = "IMPERIAL",
  AMERICAN = "AMERICAN",
  CONTINENTAL = "CONTINENTAL",
  TOWER = "TOWER"
}

export interface IHotelChain {
  id: number;
  name: string;
  type: HotelChainType;
  tileIds: number[];
}
