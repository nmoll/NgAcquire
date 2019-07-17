import { IBoardSquareState } from "./board/board-square.state";
import { IHotelChainState } from "./hotel-chain/hotel-chain.state";
import { IPlayerActionMenuState } from "./player-action-menu/player-action-menu.state";
import { IPlayerState } from "./player/player.state";

export interface IAppState {
  boardSquareState: IBoardSquareState;
  playerState: IPlayerState;
  playerActionMenuState: IPlayerActionMenuState;
  hotelChainState: IHotelChainState;
}
