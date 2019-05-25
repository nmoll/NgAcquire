import { createFeatureSelector, createSelector } from "@ngrx/store";
import { playerAdapter, PlayerState } from "./player.state";

export const getPlayersState = createFeatureSelector<PlayerState>(
  "playersState"
);

export const {
  selectIds,
  selectEntities,
  selectAll
} = playerAdapter.getSelectors(getPlayersState);

export const selectPlayerIds = selectIds;
export const selectPlayerEntities = selectEntities;
export const selectAllPlayers = selectAll;

export const getCurrentPlayerId = createSelector(
  getPlayersState,
  state => state.currentPlayerId
);

export const getCurrentPlayer = createSelector(
  selectEntities,
  getCurrentPlayerId,
  (entities, currentPlayerId) => entities[currentPlayerId]
);
