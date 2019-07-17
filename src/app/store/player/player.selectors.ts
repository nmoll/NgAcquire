import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPlayerState, playerAdapter } from "./player.state";

const getPlayerState = createFeatureSelector<IPlayerState>("playerState");

const { selectEntities, selectAll } = playerAdapter.getSelectors(
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

const getCurrentPlayerTiles = createSelector(
  getCurrentPlayer,
  currentPlayer => currentPlayer.tileIds
);

const getAllPlayerTiles = createSelector(
  selectAll,
  players =>
    players
      .map(player => player.tileIds)
      .reduce((result, tiles) => result.concat(tiles), [])
);

export const PlayerSelectors = {
  getAllPlayers: selectAll,
  getCurrentPlayerId,
  getCurrentPlayer,
  getCurrentPlayerTiles,
  getAllPlayerTiles
};
