import { createAction, props } from "@ngrx/store";
import { IBoardSquare } from "src/app/board/board-square";
import { PlayerActionMenuType } from "src/app/player-action-menu/player-action-menu-type";

export const setActiveMenuType = createAction(
  "[Player Action Menu] Set Active Menu Type",
  props<{ activeMenuType: PlayerActionMenuType }>()
);

export const confirmTilePlacement = createAction(
  "[Player Action Menu] Confirm Tile Placement",
  props<{ boardSquare: IBoardSquare }>()
);

export const endTurn = createAction("[Player Action Menu] End Turn");
