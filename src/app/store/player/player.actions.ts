import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IPlayer } from "src/app/player/player";

export const initLoadPlayers = createAction("[Init] Load Players");

export const initLoadPlayersSuccess = createAction(
  "[Init] Load Players Success",
  props<{ players: IPlayer[] }>()
);

export const setCurrentPlayer = createAction(
  "[Players] Set Current Player",
  props<{ id: number }>()
);

export const updatePlayer = createAction(
  "[Players] Update Player",
  props<{ update: Update<IPlayer> }>()
);
