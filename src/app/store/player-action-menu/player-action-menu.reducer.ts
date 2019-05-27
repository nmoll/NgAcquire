import { createReducer, on } from "@ngrx/store";
import { PlayerActionMenuActions } from "./player-action-menu.actions";
import { initialState } from "./player-action-menu.state";

export const playerActionMenuReducer = createReducer(
  initialState,

  on(
    PlayerActionMenuActions.setActiveMenuType,
    (state, { activeMenuType }) => ({
      ...state,
      activeMenuType
    })
  )
);
