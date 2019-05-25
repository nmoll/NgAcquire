import { IPlayer } from "./player";

export const playerHasTile = (player: IPlayer, boardSquareId: number) =>
  !!player.tiles.find(tile => tile.boardSquareId === boardSquareId);
