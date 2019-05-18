import { ITile } from "../tile/tile";

export interface IPlayer {
  name: string;
  cash: number;
  tiles: ITile[];
}
