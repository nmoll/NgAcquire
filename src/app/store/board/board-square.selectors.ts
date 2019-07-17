import { createFeatureSelector, createSelector } from "@ngrx/store";
import { boardSquareAdapter, IBoardSquareState } from "./board-square.state";

const getBoardSquareState = createFeatureSelector<IBoardSquareState>(
  "boardSquareState"
);

const { selectAll: getAllBoardSquares } = boardSquareAdapter.getSelectors(
  getBoardSquareState
);

const getAllBoardSquareIds = createSelector(
  getBoardSquareState,
  state => state.ids as number[]
);

const getSelectedBoardSquareId = createSelector(
  getBoardSquareState,
  state => state.selectedBoardSquareId
);

const getLastTiledBoardSquareId = createSelector(
  getBoardSquareState,
  state => state.lastTiledBoardSquareId
);

const getTiledSquareIds = createSelector(
  getBoardSquareState,
  state => state.tiledBoardSquareIds
);

export const BoardSquareSelectors = {
  getAllBoardSquares,
  getAllBoardSquareIds,
  getSelectedBoardSquareId,
  getLastTiledBoardSquareId,
  getTiledSquareIds
};
