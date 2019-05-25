import { createReducer, on } from "@ngrx/store";
import {
  setBoardSquares,
  setSelectedBoardSquare
} from "./board-square.actions";
import { boardSquareAdapter, initialState } from "./board-square.state";

export const boardSquaresReducer = createReducer(
  initialState,

  on(setBoardSquares, (state, { boardSquares }) =>
    boardSquareAdapter.addMany(boardSquares, state)
  ),

  on(setSelectedBoardSquare, (state, { id }) => ({
    ...state,
    selectedBoardSquareId: id
  }))
);
