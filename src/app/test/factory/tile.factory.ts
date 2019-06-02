import { ITile } from "src/app/models/tile";
import { tileAdapter, TileState } from "src/app/store/tile/tile.state";

const createTile = ({ boardSquareId = 0, hotelChain = null }): ITile => ({
  boardSquareId,
  hotelChain
});

const createTileState = ({
  tiles = [],
  playedTileIds = [],
  lastPlayedTileId = null
}): TileState => {
  const result = {
    playedTileIds,
    lastPlayedTileId,
    ids: [],
    entities: {}
  };

  return tileAdapter.addAll(tiles, result);
};

export const TileFactory = {
  createTile,
  createTileState
};
