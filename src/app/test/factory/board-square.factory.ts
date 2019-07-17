import { IBoardSquare } from "src/app/models/board-square";
import { BoardSquareStateType } from "src/app/models/board-square-state";
import {
  boardSquareAdapter,
  IBoardSquareState
} from "src/app/store/board/board-square.state";

const createBoardSquare = ({
  id = 0,
  display = "",
  state = BoardSquareStateType.None()
}): IBoardSquare => ({
  id,
  display,
  state
});

const createBoardSquareState = ({
  boardSquares = [],
  selectedBoardSquareId = 0,
  lastTiledBoardSquareId = null,
  tiledBoardSquareIds = []
}): IBoardSquareState => {
  let result: IBoardSquareState = {
    selectedBoardSquareId,
    lastTiledBoardSquareId,
    tiledBoardSquareIds,
    ids: [],
    entities: {}
  };

  return boardSquareAdapter.addAll(boardSquares, result);
};

export const BoardSquareFactory = {
  createBoardSquare,
  createBoardSquareState
};
