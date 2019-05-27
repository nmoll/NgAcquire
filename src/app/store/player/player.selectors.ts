import { createFeatureSelector, createSelector } from "@ngrx/store";
import { playerAdapter, PlayerState } from "./player.state";

const getPlayerState = createFeatureSelector<PlayerState>("playerState");

const { selectIds, selectEntities, selectAll } = playerAdapter.getSelectors(
  getPlayerState
);

const getCurrentPlayerId = createSelector(
  getPlayerState,
  state => state.currentPlayerId
);

const getCurrentPlayer = createSelector(
  selectEntities,
  getCurrentPlayerId,
  (entities, currentPlayerId) => entities[currentPlayerId]
);

const getAllPlayerTiles = createSelector(
  selectAll,
  players =>
    players
      .map(player => player.tiles)
      .reduce((result, tiles) => result.concat(tiles), [])
);

export const PlayerSelectors = {
  getAllPlayers: selectAll,
  getCurrentPlayerId,
  getCurrentPlayer,
  getAllPlayerTiles
};
