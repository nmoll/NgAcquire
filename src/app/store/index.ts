import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "./app-state";
import { boardSquaresReducer } from "./board/board-square.reducer";
import { hotelChainReducer } from "./hotel-chain/hotel-chain.reducer";
import { playerActionMenuReducer } from "./player-action-menu/player-action-menu.reducer";
import { playerTurnReducer } from "./player-turn/player-turn.reducer";
import { playersReducer } from "./player/player.reducer";

export const reducers: ActionReducerMap<IAppState> = {
  boardSquareState: boardSquaresReducer,
  playerState: playersReducer,
  playerTurnState: playerTurnReducer,
  playerActionMenuState: playerActionMenuReducer,
  hotelChainState: hotelChainReducer
};
