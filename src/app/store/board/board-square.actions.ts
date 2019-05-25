import { createAction, props } from "@ngrx/store";
import { IBoardSquare } from "src/app/board/board-square";

export const setBoardSquares = createAction(
  "[Board Squares] Set Board Squares",
  props<{ boardSquares: IBoardSquare[] }>()
);

export const setSelectedBoardSquare = createAction(
  "[Board Squares] Set Selected Board Square",
  props<{ id: number }>()
);
