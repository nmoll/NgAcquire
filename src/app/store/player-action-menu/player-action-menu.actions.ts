import { createAction, props } from "@ngrx/store";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";

export const PlayerActionMenuActions = {
  setActiveMenuType: createAction(
    "[Player Action Menu] Set Active Menu Type",
    props<{ activeMenuType: PlayerActionMenuType }>()
  )
};
