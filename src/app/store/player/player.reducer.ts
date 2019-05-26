import { createReducer, on } from "@ngrx/store";
import * as PlayerActions from "./player.actions";
import { initialState, playerAdapter } from "./player.state";

export const playersReducer = createReducer(
  initialState,
  on(PlayerActions.initLoadPlayersSuccess, (state, { players }) => ({
    ...playerAdapter.addMany(players, state),
    currentPlayerId: players[0].id
  })),

  on(PlayerActions.setCurrentPlayer, (state, { id }) => ({
    ...state,
    currentPlayerId: id
  })),

  on(PlayerActions.updatePlayer, (state, { update }) =>
    playerAdapter.updateOne(update, state)
  )
);
