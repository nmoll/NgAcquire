import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IBoardSquare } from "src/app/models/board-square";
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
    selectedBoardSquareId ? entities[selectedBoardSquareId] : null
);

const getAdjacentBoardSquares = createSelector(
  selectAll,
  (boardSquares, props: { boardSquare: IBoardSquare }) =>
    [
      boardSquares.find(
        b =>
          b.positionX === props.boardSquare.positionX + 1 &&
          b.positionY === props.boardSquare.positionY
      ),
      boardSquares.find(
        b =>
          b.positionX === props.boardSquare.positionX &&
          b.positionY === props.boardSquare.positionY + 1
      ),
      ,
      boardSquares.find(
        b =>
          b.positionX === props.boardSquare.positionX - 1 &&
          b.positionY === props.boardSquare.positionY
      ),
      boardSquares.find(
        b =>
          b.positionX === props.boardSquare.positionX &&
          b.positionY === props.boardSquare.positionY - 1
      )
    ].filter(boardSquare => !!boardSquare)
);

export const BoardSquareSelectors = {
  getAllBoardSquares: selectAll,
  getSelectedBoardSquare,
  getAdjacentBoardSquares
};
