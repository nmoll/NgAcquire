import { createReducer, on } from "@ngrx/store";
import { setTiles } from "./tile.actions";
import { initialState, tileAdapter } from "./tile.state";

export const tileReducer = createReducer(
  initialState,

  on(setTiles, (state, { tiles }) => tileAdapter.addMany(tiles, state))
);
