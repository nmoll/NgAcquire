import { createSelector } from "@ngrx/store";
import { BoardUtils } from "src/app/utils/board.utils";
import { BoardSquareSelectors } from "../board/board-square.selectors";
import { PlayerSelectors } from "../player/player.selectors";

const getAvailableTileIds = createSelector(
  BoardSquareSelectors.getAllBoardSquareIds,
  BoardSquareSelectors.getTiledSquareIds,
  PlayerSelectors.getAllPlayerTiles,
  (boardSquareIds, tiledIds, playerTiles) =>
    boardSquareIds.filter(
      boardSquareId =>
        !tiledIds.includes(boardSquareId) &&
        !playerTiles.includes(boardSquareId)
    )
);

const getLastPlayedTileId = createSelector(
  BoardSquareSelectors.getTiledSquareIds,
  BoardSquareSelectors.getLastTiledBoardSquareId,
  (tileIds, lastPlayedId) => tileIds.find(id => id === lastPlayedId)
);

const getAdjacentTilesIdsToLastPlayed = createSelector(
  BoardSquareSelectors.getTiledSquareIds,
  BoardSquareSelectors.getLastTiledBoardSquareId,
  (tileIds, tileId) => BoardUtils.getAdjacentBoardSquaresIds(tileId, tileIds)
);

export const TileSelectors = {
  getAvailableTileIds,
  getLastPlayedTileId,
  getAdjacentTilesIdsToLastPlayed
};
