import { createAction, props } from "@ngrx/store";
import { IBoardSquare } from "src/app/board/board-square";
import { PlayerActionMenuType } from "src/app/player-action-menu/player-action-menu-type";

export const PlayerActionMenuActions = {
  setActiveMenuType: createAction(
    "[Player Action Menu] Set Active Menu Type",
    props<{ activeMenuType: PlayerActionMenuType }>()
  ),

  confirmTilePlacement: createAction(
    "[Player Action Menu] Confirm Tile Placement",
    props<{ boardSquare: IBoardSquare }>()
  ),

  endTurn: createAction("[Player Action Menu] End Turn")
};
