import { IBoardConfig } from "../config/board-config";
import { IBoardSquare } from "../models/board-square";
import { BoardSquareStateType } from "../models/board-square-state";

/**
 * Generates the board squares based off the board dimensions
 */
const createBoardSquares = (boardConfig: IBoardConfig) => {
  const squares: IBoardSquare[] = [];
  var id = 0;
  for (var positionY = 1; positionY <= boardConfig.height; positionY++) {
    for (var positionX = 1; positionX <= boardConfig.width; positionX++) {
      const display = positionX + boardConfig.letters[positionY - 1];
      squares.push({
        id: id++,
        display,
        state: BoardSquareStateType.None()
      });
    }
  }
  return squares;
};

const findByPosition = (
  positionX: number,
  positionY: number,
  boardSquareIds: number[]
): number => boardSquareIds.find(id => id === positionX + positionY * 12);

const getPositionX = (boardSquareId: number) => boardSquareId % 12;
const getPositionY = (boardSquareId: number) => Math.floor(boardSquareId / 12);

const getAdjacentBoardSquaresIds = (
  boardSquareId: number,
  boardSquareIds: number[]
): number[] =>
  [
    findByPosition(
      getPositionX(boardSquareId) - 1,
      getPositionY(boardSquareId),
      boardSquareIds
    ),
    findByPosition(
      getPositionX(boardSquareId) + 1,
      getPositionY(boardSquareId),
      boardSquareIds
    ),
    findByPosition(
      getPositionX(boardSquareId),
      getPositionY(boardSquareId) - 1,
      boardSquareIds
    ),
    findByPosition(
      getPositionX(boardSquareId),
      getPositionY(boardSquareId) + 1,
      boardSquareIds
    )
  ].filter(boardSquareId => !!boardSquareId);

export const BoardUtils = {
  createBoardSquares,
  getAdjacentBoardSquaresIds
};
