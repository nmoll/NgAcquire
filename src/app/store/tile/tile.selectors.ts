import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerSelectors } from "../player/player.selectors";
import { tileAdapter, TileState } from "./tile.state";

const getTileState = createFeatureSelector<TileState>("tileState");

const { selectEntities, selectAll } = tileAdapter.getSelectors(getTileState);

const getPlayedTiles = createSelector(
  getTileState,
  selectEntities,
  (state, entities) => state.playedTileIds.map(id => entities[id])
);

const getPlayedTileAtPosition = createSelector(
  getPlayedTiles,
  (playedTiles, props: { positionX: number; positionY: number }) =>
    playedTiles.find(
      t => t.positionX === props.positionX && t.positionY === props.positionY
    )
);

const getAvailableTiles = createSelector(
  getTileState,
  selectAll,
  PlayerSelectors.getAllPlayerTiles,
  (state, tiles, playerTiles) =>
    tiles.filter(
      tile =>
        state.playedTileIds.indexOf(tile.id) === -1 &&
        !playerTiles.find(t => t.id === tile.id)
    )
);

const getLastPlayedTile = createSelector(
  getTileState,
  selectEntities,
  (state, entities) =>
    state.lastPlayedTileId ? entities[state.lastPlayedTileId] : null
);

const getAdjacentTilesToLastPlayedTile = createSelector(
  getPlayedTiles,
  getLastPlayedTile,
  (tiles, tile) =>
    [
      tiles.find(
        t =>
          t.positionX === tile.positionX + 1 && t.positionY === tile.positionY
      ),
      tiles.find(
        t =>
          t.positionX === tile.positionX && t.positionY === tile.positionY + 1
      ),
      ,
      tiles.find(
        t =>
          t.positionX === tile.positionX - 1 && t.positionY === tile.positionY
      ),
      tiles.find(
        t =>
          t.positionX === tile.positionX && t.positionY === tile.positionY - 1
      )
    ].filter(tile => !!tile)
);

export const TileSelectors = {
  getAllTiles: selectAll,
  getPlayedTiles,
  getPlayedTileAtPosition,
  getAvailableTiles,
  getLastPlayedTile,
  getAdjacentTilesToLastPlayedTile
};
