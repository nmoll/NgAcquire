import { createReducer, on } from "@ngrx/store";
import { BoardSquareActions } from "./board-square.actions";
import { boardSquareAdapter, initialState } from "./board-square.state";

export const boardSquaresReducer = createReducer(
  initialState,

  on(BoardSquareActions.setBoardSquares, (state, { boardSquares }) =>
    boardSquareAdapter.addMany(boardSquares, state)
  )
);
