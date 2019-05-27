import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IBoardSquare } from "src/app/models/board-square";
import { IPlayer } from "src/app/models/player";

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
  ),

  confirmTilePlacement: createAction(
    "[Player Action Menu] Confirm Tile Placement",
    props<{ boardSquare: IBoardSquare }>()
  ),

  endTurn: createAction("[Player Action Menu] End Turn")
};
