import { IBoardConfiguration } from "../board/board-configuration";
import { ITile } from "./tile";

export const createTiles = (boardConfig: IBoardConfiguration): ITile[] => {
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

export const pickRandomTiles = (
  numberOfTiles: number,
  tiles: ITile[]
): ITile[] => {
  const availableTiles = [...tiles];
  const result = [];
  for (let i = 0; i < numberOfTiles; i++) {
    var randomIdx = Math.floor(Math.random() * availableTiles.length);
    const tile = availableTiles.splice(randomIdx, 1)[0];
    result.push(tile);
  }
  return result;
};
