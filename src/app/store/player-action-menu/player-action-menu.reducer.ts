import { createReducer, on } from "@ngrx/store";
import { PlayerActionMenuUtils } from "src/app/utils/player-action-menu.utils";
import { PlayerActionMenuActions } from "./player-action-menu.actions";
import { initialState } from "./player-action-menu.state";

export const playerActionMenuReducer = createReducer(
  initialState,

  on(
    PlayerActionMenuActions.updateActionMenuQueue,
    (state, { add, removeCurrent }) => {
      const queuedMenuActions = PlayerActionMenuUtils.orderByPriority([
        ...state.queuedMenuActions
      ]);
      if (removeCurrent) {
        queuedMenuActions.shift();
      }
      if (add !== undefined) {
        queuedMenuActions.push(add);
      }

      return {
        ...initialState,
        queuedMenuActions
      };
    }
  )
);
