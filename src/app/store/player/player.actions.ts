import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IPlayer } from "src/app/player/player";

export const PlayerActions = {
  loadPlayers: createAction("[Init] Load Players"),

  loadPlayersSuccess: createAction(
    "[Init] Load Players Success",
    props<{ players: IPlayer[] }>()
  ),

  setCurrentPlayer: createAction(
    "[Players] Set Current Player",
    props<{ id: number }>()
  ),

  updatePlayer: createAction(
    "[Players] Update Player",
    props<{ update: Update<IPlayer> }>()
  )
};
