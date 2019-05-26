import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerActionMenuState } from "./player-action-menu.state";

export const getPlayerActionMenuState = createFeatureSelector<
  PlayerActionMenuState
>("playerActionMenuState");

export const getActiveMenuType = createSelector(
  getPlayerActionMenuState,
  state => state.activeMenuType
);
