import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerActionMenuUtils } from "src/app/utils/player-action-menu.utils";
import { IPlayerActionMenuState } from "./player-action-menu.state";

const getPlayerActionMenuState = createFeatureSelector<IPlayerActionMenuState>(
  "playerActionMenuState"
);

const getActiveMenuType = createSelector(
  getPlayerActionMenuState,
  state => PlayerActionMenuUtils.findByHighestPriority(state.queuedMenuActions)
);

// const getMenuType = createSelector(
//   PlayerSelectors.getCurrentPlayerTiles,
//   BoardSquareSelectors.
// )

export const PlayerActionMenuSelectors = {
  getPlayerActionMenuState,
  getActiveMenuType
};
