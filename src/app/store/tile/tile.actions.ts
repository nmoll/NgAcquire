import { createAction, props } from "@ngrx/store";
import { ITile } from "src/app/tile/tile";

export const TileActions = {
  setTiles: createAction("[Tiles] Set Tiles", props<{ tiles: ITile[] }>())
};
