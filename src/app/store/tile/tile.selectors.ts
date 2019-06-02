import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerSelectors } from "../player/player.selectors";
import { tileAdapter, TileState } from "./tile.state";

const getTileState = createFeatureSelector<TileState>("tileState");

const { selectEntities, selectAll } = tileAdapter.getSelectors(getTileState);

const getPlayedTiles = createSelector(
  getTileState,
  selectEntities,
  (state, entities) =>
    state.playedTileIds.map(boardSquareId => entities[boardSquareId])
);

const getPlayedTileByBoardSquareId = createSelector(
  getPlayedTiles,
  (playedTiles, props: { boardSquareId: number }) =>
    playedTiles.find(t => t.boardSquareId === props.boardSquareId)
);

const getAvailableTiles = createSelector(
  getTileState,
  selectAll,
  PlayerSelectors.getAllPlayerTiles,
  (state, tiles, playerTiles) =>
    tiles.filter(
      tile =>
        state.playedTileIds.indexOf(tile.boardSquareId) === -1 &&
        !playerTiles.find(t => t.boardSquareId === tile.boardSquareId)
    )
);

const getLastPlayedTile = createSelector(
  getTileState,
  selectEntities,
  (state, entities) =>
    state.lastPlayedTileId ? entities[state.lastPlayedTileId] : null
);

export const TileSelectors = {
  getAllTiles: selectAll,
  getPlayedTiles,
  getPlayedTileByBoardSquareId,
  getAvailableTiles,
  getLastPlayedTile
};
