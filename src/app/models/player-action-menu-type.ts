/**
 * The type of action menu to display
 *
 * !! Important these are ordered by priority.
 * !! If two menu actions are queued, the one with higher priority will be displayed.
 * !! Starts at value = 1 for truthy checks
 */
export enum PlayerActionMenuType {
  /**
   * Shown when the player needs to choose a hotel chain to start
   */
  START_HOTEL_CHAIN = 1,

  /**
   * Shown when the player needs to select a tile to play
   */
  PLACE_TILE,

  /**
   * Shown for the player to confirm they are finishied with their turn
   */
  END_TURN,

  /**
   * Shown while a computer is moving
   */
  COMPUTER_MOVING
}
