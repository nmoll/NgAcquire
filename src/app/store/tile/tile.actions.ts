import { createAction, props } from "@ngrx/store";
import { ITile } from "src/app/tile/tile";

export const setTiles = createAction(
  "[Tiles] Set Tiles",
  props<{ tiles: ITile[] }>()
);
