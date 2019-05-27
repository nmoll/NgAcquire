import { ITile } from "./tile";

export enum PlayerType {
  HUMAN,
  COMPUTER
}

export interface IPlayer {
  id: number;
  name: string;
  cash: number;
  tiles: ITile[];
  playerType: PlayerType;
}
