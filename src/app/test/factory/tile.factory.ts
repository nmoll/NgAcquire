import { ITile } from "src/app/models/tile";
import { tileAdapter, TileState } from "src/app/store/tile/tile.state";

const createTile = ({
  id = 0,
  positionX = 0,
  positionY = 0,
  hotelChain = null
}): ITile => ({
  id,
  positionX,
  positionY,
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
