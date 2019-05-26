import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getAllPlayerTiles } from "../player/player.selectors";
import { tileAdapter, TileState } from "./tile.state";

export const getTileState = createFeatureSelector<TileState>("tileState");

export const {
  selectIds,
  selectEntities,
  selectAll
} = tileAdapter.getSelectors(getTileState);

export const selectTileIds = selectIds;
export const selectTileEntities = selectEntities;
export const selectAllTiles = selectAll;

export const getTileById = createSelector(
  selectTileEntities,
  (entities, props: { id: number }) => entities[props.id]
);

export const getAvailableTiles = createSelector(
  selectAllTiles,
  getAllPlayerTiles,
  (tiles, playerTiles) =>
    tiles.filter(
      tile => !playerTiles.find(t => t.boardSquareId === tile.boardSquareId)
    )
);
