import { IBoardConfig } from "../config/board-config";
import { IBoardSquare } from "../models/board-square";

/**
 * Generates the board squares based off the board dimensions
 */
const createBoardSquares = (boardConfig: IBoardConfig) => {
  const squares: IBoardSquare[] = [];
  var id = 1;
  for (var positionY = 1; positionY <= boardConfig.height; positionY++) {
    for (var positionX = 1; positionX <= boardConfig.width; positionX++) {
      const display = positionX + boardConfig.letters[positionY - 1];
      squares.push({
        id: id++,
        positionX,
        positionY,
        display,
        tile: null
      });
    }
  }
  return squares;
};

const findById = (id: number, boardSquares: IBoardSquare[]): IBoardSquare =>
  boardSquares.find(boardSquare => boardSquare.id === id);

const getBoardSquareAtPosition = (
  positionX: number,
  positionY: number,
  boardSquares: IBoardSquare[]
): IBoardSquare =>
  boardSquares.find(
    boardSquare =>
      boardSquare.positionX === positionX && boardSquare.positionY === positionY
  );

const getAdjacentBoardSquares = (
  boardSquare: IBoardSquare,
  boardSquares: IBoardSquare[]
): IBoardSquare[] =>
  [
    getBoardSquareAtPosition(
      boardSquare.positionX - 1,
      boardSquare.positionY,
      boardSquares
    ),
    getBoardSquareAtPosition(
      boardSquare.positionX + 1,
      boardSquare.positionY,
      boardSquares
    ),
    getBoardSquareAtPosition(
      boardSquare.positionX,
      boardSquare.positionY - 1,
      boardSquares
    ),
    getBoardSquareAtPosition(
      boardSquare.positionX,
      boardSquare.positionY + 1,
      boardSquares
    )
  ].filter(boardSquare => !!boardSquare);

const hasAdjacentTile = (
  boardSquare: IBoardSquare,
  boardSquares: IBoardSquare[]
): boolean =>
  !!getAdjacentBoardSquares(boardSquare, boardSquares).find(
    boardSquare => !!boardSquare.tile
  );

export const BoardUtils = {
  createBoardSquares,
  findById,
  hasAdjacentTile
};
