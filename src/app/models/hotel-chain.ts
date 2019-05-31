export enum HotelChainType {
  WORLDWIDE,
  LUXOR,
  FESTIVAL,
  IMPERIAL,
  AMERICAN,
  CONTINENTAL,
  TOWER
}

export interface IHotelChain {
  id: number;
  name: string;
  type: HotelChainType;
}
