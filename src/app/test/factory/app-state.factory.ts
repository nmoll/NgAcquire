import { IAppState } from "src/app/store/app-state";

const createAppState = ({
  boardSquareState = null,
  playerState = null,
  playerActionMenuState = null,
  hotelChainState = null
}): IAppState => ({
  boardSquareState,
  playerState,
  playerActionMenuState,
  hotelChainState
});

export const AppStateFactory = {
  createAppState
};
