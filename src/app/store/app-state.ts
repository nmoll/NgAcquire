import { BoardSquaresState } from "./board/board-square.state";
import { PlayerActionMenuState } from "./player-action-menu/player-action-menu.state";
import { PlayerState } from "./player/player.state";
import { TileState } from "./tile/tile.state";

export interface IAppState {
  boardSquaresState: BoardSquaresState;
  playersState: PlayerState;
  tileState: TileState;
  playerActionMenuState: PlayerActionMenuState;
}
