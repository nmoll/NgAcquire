export enum PlayerType {
  HUMAN,
  COMPUTER
}

export interface IPlayer {
  id: number;
  name: string;
  cash: number;
  tileIds: number[];
  playerType: PlayerType;
}
