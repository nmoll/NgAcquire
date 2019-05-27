export interface IPlayerConfig {
  startingCash: number;
  maxTilesInHand: number;
}

export const DefaultPlayerConfig: IPlayerConfig = {
  startingCash: 6000,
  maxTilesInHand: 6
};
