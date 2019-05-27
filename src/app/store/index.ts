import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "./app-state";
import { boardSquaresReducer } from "./board/board-square.reducer";
import { playerActionMenuReducer } from "./player-action-menu/player-action-menu.reducer";
import { playersReducer } from "./player/player.reducer";
import { tileReducer } from "./tile/tile.reducer";

export const reducers: ActionReducerMap<IAppState> = {
  boardSquareState: boardSquaresReducer,
  playerState: playersReducer,
  tileState: tileReducer,
  playerActionMenuState: playerActionMenuReducer
};
