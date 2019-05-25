/**
 * Board square
 */
export interface IBoardSquare {
  /**
   * Unique id
   */
  id: number;

  /**
   * The horizontal position on the board
   */
  positionX: number;

  /**
   * The vertical position on the board
   */
  positionY: number;

  /**
   * String used for display purposes
   */
  display: string;
}
