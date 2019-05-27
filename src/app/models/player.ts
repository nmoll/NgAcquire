import { ITile } from "./tile";

export interface IPlayer {
  id: number;
  name: string;
  cash: number;
  tiles: ITile[];
}
