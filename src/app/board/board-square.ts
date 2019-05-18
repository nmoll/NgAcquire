export enum BoardSquareState {
  /**
   * Default blank state
   */
  DEFAULT,

  /**
   * Available for the user to select
   */
  AVAILABLE_FOR_SELECTION,

  /**
   * Is selected
   */
  SELECTED
}
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

  /**
   * State of the board square
   */
  state: BoardSquareState;
}
