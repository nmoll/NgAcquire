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

export const BoardUtils = {
  createBoardSquares
};
