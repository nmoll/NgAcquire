import { createReducer, on } from "@ngrx/store";
import * as PlayerActions from "./player.actions";
import { initialState, playerAdapter } from "./player.state";

export const playersReducer = createReducer(
  initialState,
  on(PlayerActions.setPlayers, (state, { players }) =>
    playerAdapter.addMany(players, state)
  ),

  on(PlayerActions.setCurrentPlayer, (state, { id }) => ({
    ...state,
    currentPlayerId: id
  }))
);
