import { DefaultPlayerConfig } from "../config/player-config";
import { IPlayer } from "../models/player";
import { TileUtils } from "./tile.utils";

const initPlayerTiles = (players: IPlayer[], tileIds: number[]): IPlayer[] => {
  const randomTiles = TileUtils.pickRandomTiles(
    players.length * DefaultPlayerConfig.maxTilesInHand,
    tileIds
  );
  return players.map(player => ({
    ...player,
    tileIds: randomTiles.splice(0, DefaultPlayerConfig.maxTilesInHand)
  }));
};

const playerHasTile = (player: IPlayer, id: number) =>
  !!player.tileIds.find(tileId => tileId === id);

const getNextPlayer = (player: IPlayer, players: IPlayer[]) => {
  const idx = players.indexOf(player);
  return idx + 1 === players.length ? players[0] : players[idx + 1];
};

export const PlayerUtils = {
  initPlayerTiles,
  playerHasTile,
  getNextPlayer
};
