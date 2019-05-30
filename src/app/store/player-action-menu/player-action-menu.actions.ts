import { createAction, props } from "@ngrx/store";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";

export const PlayerActionMenuActions = {
  updateActionMenuQueue: createAction(
    "[Player Action Menu] Update Action Menu Queue",
    props<{ add?: PlayerActionMenuType; removeCurrent: boolean }>()
  )
};
