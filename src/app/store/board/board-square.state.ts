import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { IBoardSquare } from "src/app/models/board-square";

export interface IBoardSquareState extends EntityState<IBoardSquare> {
  selectedBoardSquareId: number | null;
  lastTiledBoardSquareId: number | null;
  tiledBoardSquareIds: number[];
}

export const boardSquareAdapter = createEntityAdapter<IBoardSquare>({
  selectId: square => square.id
});

export const initialState: IBoardSquareState = boardSquareAdapter.getInitialState(
  {
    selectedBoardSquareId: null,
    lastTiledBoardSquareId: null,
    tiledBoardSquareIds: []
  }
);
