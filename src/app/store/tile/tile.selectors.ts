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

export const TileSelectors = {
  getAllTiles: selectAll,
  getTileById,
  getAvailableTiles
};
