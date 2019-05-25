import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "./app-state";
import { boardSquaresReducer } from "./board/board-square.reducer";
import { playersReducer } from "./player/player.reducer";

export const reducers: ActionReducerMap<IAppState> = {
  boardSquaresState: boardSquaresReducer,
  playersState: playersReducer
};
