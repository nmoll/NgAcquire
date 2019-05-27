import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerActionMenuState } from "./player-action-menu.state";

const getPlayerActionMenuState = createFeatureSelector<PlayerActionMenuState>(
  "playerActionMenuState"
);

const getActiveMenuType = createSelector(
  getPlayerActionMenuState,
  state => state.activeMenuType
);

export const PlayerActionMenuSelectors = {
  getPlayerActionMenuState,
  getActiveMenuType
};
