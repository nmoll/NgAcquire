import { IBoardConfig } from "../config/board-config";
import { ITile } from "../models/tile";

const createTiles = (boardConfig: IBoardConfig): ITile[] => {
  const tiles: ITile[] = [];
  var id = 1;
  for (var positionY = 1; positionY <= boardConfig.height; positionY++) {
    for (var positionX = 1; positionX <= boardConfig.width; positionX++) {
      tiles.push({
        id: id++,
        positionX,
        positionY,
        hotelChain: null
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

const removeTileById = (tiles: ITile[], id: number): ITile[] => [
  ...tiles.filter(tile => tile.id !== id)
];

export const TileUtils = {
  createTiles,
  pickRandomTiles,
  removeTileById
};
