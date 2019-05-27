/**
 * The type of action menu to display
 */
export enum PlayerActionMenuType {
  /**
   * Shown when the player needs to select a tile to play
   */
  PLACE_TILE,

  /**
   * Shown while a computer is moving
   */
  COMPUTER_MOVING,

  /**
   * Shown for the player to confirm they are finishied with their turn
   */
  END_TURN
}
