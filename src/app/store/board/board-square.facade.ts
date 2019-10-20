import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DefaultBoardConfig } from "src/app/config/board-config";
import { IBoardSquare } from "src/app/models/board-square";
import { BoardUtils } from "src/app/utils/board.utils";
import { BoardSquareActions } from "./board-square.actions";
import { BoardSquareSelectors } from "./board-square.selectors";
import { IBoardSquareState } from "./board-square.state";

@Injectable({
  providedIn: "root"
})
export class BoardSquareFacade {
  public boardSquares$: Observable<IBoardSquare[]>;

  public selectedBoardSquareId$: Observable<number>;

  constructor(private store: Store<IBoardSquareState>) {
    this.boardSquares$ = this.store.select(
      BoardSquareSelectors.getAllBoardSquaresWithState
    );

    this.selectedBoardSquareId$ = this.store.pipe(
      select(BoardSquareSelectors.getSelectedBoardSquareId)
    );
  }

  public loadBoardSquares() {
    this.store.dispatch(
      BoardSquareActions.setBoardSquares({
        boardSquares: BoardUtils.createBoardSquares(DefaultBoardConfig)
      })
    );
  }

  public select(boardSquare: IBoardSquare) {
    this.store.dispatch(
      BoardSquareActions.setSelectedBoardSquare({ id: boardSquare.id })
    );
  }
}
