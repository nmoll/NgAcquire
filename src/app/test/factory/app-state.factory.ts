import { IAppState } from "src/app/store/app-state";

const createAppState = ({
  boardSquareState = null,
  playerState = null,
  tileState = null,
  playerActionMenuState = null,
  hotelChainState = null
}): IAppState => ({
  boardSquareState,
  playerState,
  tileState,
  playerActionMenuState,
  hotelChainState
});

export const AppStateFactory = {
  createAppState
};
