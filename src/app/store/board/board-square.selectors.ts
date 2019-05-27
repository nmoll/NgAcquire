import { createFeatureSelector, createSelector } from "@ngrx/store";
import { boardSquareAdapter, BoardSquareState } from "./board-square.state";

const getBoardSquareState = createFeatureSelector<BoardSquareState>(
  "boardSquareState"
);

const { selectEntities, selectAll } = boardSquareAdapter.getSelectors(
  getBoardSquareState
);

const getSelectedBoardSquareId = createSelector(
  getBoardSquareState,
  state => state.selectedBoardSquareId
);

const getSelectedBoardSquare = createSelector(
  selectEntities,
  getSelectedBoardSquareId,
  (entities, selectedBoardSquareId) =>
    selectedBoardSquareId && entities[selectedBoardSquareId]
);

export const BoardSquareSelectors = {
  getAllBoardSquares: selectAll,
  getSelectedBoardSquareId,
  getSelectedBoardSquare
};
