import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { ITile } from "src/app/tile/tile";

export interface TileState extends EntityState<ITile> {}

export const tileAdapter = createEntityAdapter<ITile>({
  selectId: state => state.boardSquareId
});

export const initialState: TileState = tileAdapter.getInitialState();
