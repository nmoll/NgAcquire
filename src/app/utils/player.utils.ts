import { DefaultPlayerConfig } from "../config/player-config";
import { IPlayer } from "../models/player";
import { ITile } from "../models/tile";
import { TileUtils } from "./tile.utils";

const initPlayerTiles = (players: IPlayer[], tiles: ITile[]): IPlayer[] => {
  const randomTiles = TileUtils.pickRandomTiles(
    players.length * DefaultPlayerConfig.maxTilesInHand,
    tiles
  );
  return players.map(player => ({
    ...player,
    tiles: randomTiles.splice(0, DefaultPlayerConfig.maxTilesInHand)
  }));
};

const playerHasTile = (player: IPlayer, id: number) =>
  !!player.tiles.find(tile => tile.id === id);

const getNextPlayer = (player: IPlayer, players: IPlayer[]) => {
  const idx = players.indexOf(player);
  return idx + 1 === players.length ? players[0] : players[idx + 1];
};

export const PlayerUtils = {
  initPlayerTiles,
  playerHasTile,
  getNextPlayer
};
