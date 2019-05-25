import { createAction, props } from "@ngrx/store";
import { IPlayer } from "src/app/player/player";

export const setPlayers = createAction(
  "[Players] Set Players",
  props<{ players: IPlayer[] }>()
);

export const setCurrentPlayer = createAction(
  "[Players] Set Current Player",
  props<{ id: number }>()
);
