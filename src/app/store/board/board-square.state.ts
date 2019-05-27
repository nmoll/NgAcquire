import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { IBoardSquare } from "src/app/board/board-square";

export interface BoardSquareState extends EntityState<IBoardSquare> {
  selectedBoardSquareId: number | null;
}

export const boardSquareAdapter = createEntityAdapter<IBoardSquare>();

export const initialState: BoardSquareState = boardSquareAdapter.getInitialState(
  {
    selectedBoardSquareId: null
  }
);
