import { createReducer, on } from "@ngrx/store";
import { HumanPlayerActions } from "../player/player.actions";
import { BoardSquareActions } from "./board-square.actions";
import { boardSquareAdapter, initialState } from "./board-square.state";

export const boardSquaresReducer = createReducer(
  initialState,

  on(BoardSquareActions.setBoardSquares, (state, { boardSquares }) =>
    boardSquareAdapter.addMany(boardSquares, state)
  ),

  on(BoardSquareActions.setSelectedBoardSquare, (state, { id }) => ({
    ...state,
    selectedBoardSquareId: id
  })),

  on(HumanPlayerActions.confirmTilePlacement, state => ({
    ...state,
    selectedBoardSquareId: null
  })),

  on(BoardSquareActions.updateBoardSquare, (state, { update }) => ({
    ...boardSquareAdapter.updateOne(update, state),
    selectedBoardSquareId: null
  }))
);
