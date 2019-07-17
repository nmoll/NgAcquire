const pickRandomTiles = (
  numberOfTiles: number,
  tileIds: number[]
): number[] => {
  const availableTiles = [...tileIds];
  const result = [];
  for (let i = 0; i < numberOfTiles; i++) {
    var randomIdx = Math.floor(Math.random() * availableTiles.length);
    const tileId = availableTiles.splice(randomIdx, 1)[0];
    result.push(tileId);
  }
  return result;
};

export const TileUtils = {
  pickRandomTiles
};
