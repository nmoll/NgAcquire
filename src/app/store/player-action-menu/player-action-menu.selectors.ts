import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerActionMenuUtils } from "src/app/utils/player-action-menu.utils";
import { PlayerActionMenuState } from "./player-action-menu.state";

const getPlayerActionMenuState = createFeatureSelector<PlayerActionMenuState>(
  "playerActionMenuState"
);

const getActiveMenuType = createSelector(
  getPlayerActionMenuState,
  state => PlayerActionMenuUtils.findByHighestPriority(state.queuedMenuActions)
);

export const PlayerActionMenuSelectors = {
  getPlayerActionMenuState,
  getActiveMenuType
};
