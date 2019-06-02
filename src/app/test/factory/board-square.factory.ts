import { IBoardSquare } from "src/app/models/board-square";
import {
  boardSquareAdapter,
  BoardSquareState
} from "src/app/store/board/board-square.state";

const createBoardSquare = ({
  id = 0,
  positionX = 0,
  positionY = 0,
  display = ""
}): IBoardSquare => ({
  id,
  positionX,
  positionY,
  display
});

const createBoardSquareState = ({
  boardSquares = [],
  selectedBoardSquareId = 0
}): BoardSquareState => {
  let result: BoardSquareState = {
    selectedBoardSquareId,
    ids: [],
    entities: {}
  };

  return boardSquareAdapter.addAll(boardSquares, result);
};

export const BoardSquareFactory = {
  createBoardSquare,
  createBoardSquareState
};
