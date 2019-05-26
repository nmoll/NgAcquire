import { IPlayer } from "./player";

export const playerHasTile = (player: IPlayer, boardSquareId: number) =>
  !!player.tiles.find(tile => tile.boardSquareId === boardSquareId);

export const getNextPlayer = (player: IPlayer, players: IPlayer[]) => {
  const idx = players.indexOf(player);
  return idx + 1 === players.length ? players[0] : players[idx + 1];
};
