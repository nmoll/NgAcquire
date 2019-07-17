import { BoardSquareState } from "./board-square-state";

/**
 * Board square
 */
export interface IBoardSquare {
  /**
   * Unique id
   */
  id: number;

  /**
   * String used for display purposes
   */
  display: string;

  /**
   * Tile state of the board square
   */
  state: BoardSquareState;
}
