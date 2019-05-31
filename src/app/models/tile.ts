import { IHotelChain } from "./hotel-chain";

export interface ITile {
  boardSquareId: number;

  hotelChain: IHotelChain | null;
}
