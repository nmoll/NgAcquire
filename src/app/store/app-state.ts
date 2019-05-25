import { BoardSquaresState } from "./board/board-square.state";
import { PlayerState } from "./player/player.state";

export interface IAppState {
  boardSquaresState: BoardSquaresState;
  playersState: PlayerState;
}
