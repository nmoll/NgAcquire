import { IBoardConfig } from "../config/board-config";
import { ITile } from "../models/tile";

const createTiles = (boardConfig: IBoardConfig): ITile[] => {
  const tiles: ITile[] = [];
  var boardSquareId = 1;
  for (var positionY = 1; positionY <= boardConfig.height; positionY++) {
    for (var positionX = 1; positionX <= boardConfig.width; positionX++) {
      tiles.push({
        boardSquareId: boardSquareId++
      });
    }
  }
  return tiles;
};

const pickRandomTiles = (numberOfTiles: number, tiles: ITile[]): ITile[] => {
  const availableTiles = [...tiles];
  const result = [];
  for (let i = 0; i < numberOfTiles; i++) {
    var randomIdx = Math.floor(Math.random() * availableTiles.length);
    const tile = availableTiles.splice(randomIdx, 1)[0];
    result.push(tile);
  }
  return result;
};

export const TileUtils = {
  createTiles,
  pickRandomTiles
};
