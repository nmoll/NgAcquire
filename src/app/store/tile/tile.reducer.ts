import { createReducer, on } from "@ngrx/store";
import { TileActions } from "./tile.actions";
import { initialState, tileAdapter } from "./tile.state";

export const tileReducer = createReducer(
  initialState,

  on(TileActions.setTiles, (state, { tiles }) =>
    tileAdapter.addMany(tiles, state)
  )
);
