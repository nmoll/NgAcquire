import { HotelChainType } from "./hotel-chain";

interface None {
  type: "None";
}

interface AvailableForSelection {
  type: "AvailableForSelection";
}

interface Selected {
  type: "Selected";
}

interface HasTile {
  type: "HasTile";
}

interface PendingHotel {
  type: "PendingHotel";
}

interface HasHotelChain {
  type: "HasHotelChain";
  hotelChainType: HotelChainType;
}

export type BoardSquareState =
  | None
  | AvailableForSelection
  | Selected
  | HasTile
  | PendingHotel
  | HasHotelChain;

export const BoardSquareStateType = {
  None: (): None => ({
    type: "None"
  }),
  AvailableForSelection: (): AvailableForSelection => ({
    type: "AvailableForSelection"
  }),
  Selected: (): Selected => ({
    type: "Selected"
  }),
  HasTile: (): HasTile => ({
    type: "HasTile"
  }),
  PendingHotel: (): PendingHotel => ({
    type: "PendingHotel"
  }),
  HasHotelChain: (hotelChainType: HotelChainType): HasHotelChain => ({
    type: "HasHotelChain",
    hotelChainType
  })
};
