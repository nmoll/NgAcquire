import { HotelChainType } from "./hotel-chain";

interface None {
  type: "None";
}

interface Unconfirmed {
  type: "Unconfirmed";
  boardSquareId: number;
}

interface Confirmed {
  type: "Confirmed";
  boardSquareId: number;
}

export type BoardSquareSelectedState = None | Unconfirmed | Confirmed;

export const BoardSquareSelectedStateType = {
  None: (): None => ({
    type: "None"
  }),
  Unconfirmed: (boardSquareId: number): Unconfirmed => ({
    type: "Unconfirmed",
    boardSquareId
  }),
  Confirmed: (boardSquareId: number): Confirmed => ({
    type: "Confirmed",
    boardSquareId
  })
};

export interface IPlayerTurn {
  boardSquareOptionIds: number[];
  boardSquareSelectedState: BoardSquareSelectedState;
  selectedHotelChain?: HotelChainType;
}
