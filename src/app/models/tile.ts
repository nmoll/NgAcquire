import { IHotelChain } from "./hotel-chain";

export interface ITile {
  id: number;
  positionX: number;
  positionY: number;

  hotelChain: IHotelChain | null;
}
