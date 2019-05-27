import { IPlayer } from "../models/player";

const playerHasTile = (player: IPlayer, boardSquareId: number) =>
  !!player.tiles.find(tile => tile.boardSquareId === boardSquareId);

const getNextPlayer = (player: IPlayer, players: IPlayer[]) => {
  const idx = players.indexOf(player);
  return idx + 1 === players.length ? players[0] : players[idx + 1];
};

export const PlayerUtils = {
  playerHasTile,
  getNextPlayer
};
