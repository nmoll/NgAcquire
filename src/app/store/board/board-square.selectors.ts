import { createFeatureSelector, createSelector } from "@ngrx/store";
import { boardSquareAdapter, BoardSquaresState } from "./board-square.state";

export const getBoardSquaresState = createFeatureSelector<BoardSquaresState>(
  "boardSquaresState"
);

export const {
  selectIds,
  selectEntities,
  selectAll
} = boardSquareAdapter.getSelectors(getBoardSquaresState);

export const selectBoardSquareIds = selectIds;
export const selectBoardSquareEntities = selectEntities;
export const selectAllBoardSquares = selectAll;

export const getSelectedBoardSquareId = createSelector(
  getBoardSquaresState,
  state => state.selectedBoardSquareId
);

export const getSelectedBoardSquare = createSelector(
  selectBoardSquareEntities,
  getSelectedBoardSquareId,
  (entities, selectedBoardSquareId) =>
    selectedBoardSquareId && entities[selectedBoardSquareId]
);
