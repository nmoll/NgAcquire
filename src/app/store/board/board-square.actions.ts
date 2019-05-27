import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IBoardSquare } from "src/app/board/board-square";

export const BoardSquareActions = {
  setBoardSquares: createAction(
    "[Board Squares] Set Board Squares",
    props<{ boardSquares: IBoardSquare[] }>()
  ),

  setSelectedBoardSquare: createAction(
    "[Board Squares] Set Selected Board Square",
    props<{ id: number }>()
  ),

  updateBoardSquare: createAction(
    "[Board Squares] Update Board Square",
    props<{ update: Update<IBoardSquare> }>()
  )
};
