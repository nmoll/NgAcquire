import { IAppState } from "src/app/store/app-state";

const createAppState = ({
  boardSquareState = null,
  playerState = null,
  playerTurnState = null,
  playerActionMenuState = null,
  hotelChainState = null
}): IAppState => ({
  boardSquareState,
  playerState,
  playerTurnState,
  playerActionMenuState,
  hotelChainState
});

export const AppStateFactory = {
  createAppState
};
