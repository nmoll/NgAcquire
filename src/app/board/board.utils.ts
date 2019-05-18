import { IBoardConfiguration } from "./board-configuration";
import { BoardSquareState, IBoardSquare } from "./board-square";

/**
 * Generates the board squares based off the board dimensions
 */
export const createBoardSquares = (boardConfig: IBoardConfiguration) => {
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
        state: BoardSquareState.DEFAULT
      });
    }
  }
  return squares;
};

/**
 * @returns whether the board square is available for selection
 */
export const canSelectBoardSquare = (boardSquare: IBoardSquare) =>
  boardSquare.state === BoardSquareState.AVAILABLE_FOR_SELECTION;
