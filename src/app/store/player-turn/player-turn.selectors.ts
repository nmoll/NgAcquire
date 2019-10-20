import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPlayerTurnState, playerTurnAdapter } from "./player-turn.state";

const getPlayerTurnState = createFeatureSelector<IPlayerTurnState>(
  "playerTurnState"
);

const { selectAll: getAllPlayerTurns } = playerTurnAdapter.getSelectors(
  getPlayerTurnState
);

const getCurrentPlayerTurn = createSelector(
  getAllPlayerTurns,
  playerTurns => playerTurns[0]
);

export const PlayerTurnSelectors = {
  getAllPlayerTurns,
  getCurrentPlayerTurn
};
