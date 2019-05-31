import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerSelectors } from "../player/player.selectors";
import { tileAdapter, TileState } from "./tile.state";

const getTileState = createFeatureSelector<TileState>("tileState");

const { selectEntities, selectAll } = tileAdapter.getSelectors(getTileState);

const getTileById = createSelector(
  selectEntities,
  (entities, props: { id: number }) => entities[props.id]
);

const getAvailableTiles = createSelector(
  selectAll,
  PlayerSelectors.getAllPlayerTiles,
  (tiles, playerTiles) =>
    tiles.filter(
      tile => !playerTiles.find(t => t.boardSquareId === tile.boardSquareId)
    )
);

const getLastPlayedTileId = createSelector(
  getTileState,
  state => state.lastPlayedTileId
);

const getLastPlayedTile = createSelector(
  selectEntities,
  getLastPlayedTileId,
  (entities, lastPlayedTileId) =>
    lastPlayedTileId ? entities[lastPlayedTileId] : null
);

export const TileSelectors = {
  getAllTiles: selectAll,
  getTileById,
  getAvailableTiles,
  getLastPlayedTile
};
