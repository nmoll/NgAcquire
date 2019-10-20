import { IBoardSquareState } from "./board/board-square.state";
import { IHotelChainState } from "./hotel-chain/hotel-chain.state";
import { IPlayerActionMenuState } from "./player-action-menu/player-action-menu.state";
import { IPlayerTurnState } from "./player-turn/player-turn.state";
import { IPlayerState } from "./player/player.state";

export interface IAppState {
  boardSquareState: IBoardSquareState;
  playerState: IPlayerState;
  playerTurnState: IPlayerTurnState;
  playerActionMenuState: IPlayerActionMenuState;
  hotelChainState: IHotelChainState;
}
