import { BoardSquareState } from "./board/board-square.state";
import { HotelChainState } from "./hotel-chain/hotel-chain.state";
import { PlayerActionMenuState } from "./player-action-menu/player-action-menu.state";
import { PlayerState } from "./player/player.state";
import { TileState } from "./tile/tile.state";

export interface IAppState {
  boardSquareState: BoardSquareState;
  playerState: PlayerState;
  tileState: TileState;
  playerActionMenuState: PlayerActionMenuState;
  hotelChainState: HotelChainState;
}
