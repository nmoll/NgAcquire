import { createReducer, on } from "@ngrx/store";
import {
  ComputerPlayerActions,
  HumanPlayerActions
} from "../player/player.actions";
import { TileActions } from "./tile.actions";
import { initialState, tileAdapter } from "./tile.state";

export const tileReducer = createReducer(
  initialState,

  on(TileActions.setTiles, (state, { tiles }) =>
    tileAdapter.addMany(tiles, state)
  ),

  on(
    HumanPlayerActions.confirmTilePlacement,
    ComputerPlayerActions.confirmTilePlacement,
    (state, { boardSquare }) => ({
      ...state,
      lastPlayedTileId: boardSquare.id,
      playedTileIds: [...state.playedTileIds, boardSquare.id]
    })
  )
);
