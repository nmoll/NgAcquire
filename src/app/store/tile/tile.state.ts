import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { ITile } from "src/app/models/tile";

export interface TileState extends EntityState<ITile> {
  lastPlayedTileId: number | null;
}

export const tileAdapter = createEntityAdapter<ITile>({
  selectId: state => state.boardSquareId
});

export const initialState: TileState = tileAdapter.getInitialState({
  lastPlayedTileId: null
});
