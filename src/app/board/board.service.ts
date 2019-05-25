import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPlayer } from "../player/player";
import * as PlayerUtils from "../player/player.utils";
import * as BoardSquareActions from "../store/board/board-square.actions";
import * as BoardSquareSelectors from "../store/board/board-square.selectors";
import { BoardSquaresState } from "../store/board/board-square.state";
import * as PlayerSelectors from "../store/player/player.selectors";
import { IBoardSquare } from "./board-square";
@Injectable({
  providedIn: "root"
})
export class BoardService {
  public boardSquares$: Observable<IBoardSquare[]>;

  public selectedBoardSquare$: Observable<IBoardSquare>;

  private currentPlayer$: Observable<IPlayer>;

  constructor(private store: Store<BoardSquaresState>) {
    this.boardSquares$ = this.store.pipe(
      select(BoardSquareSelectors.selectAllBoardSquares)
    );

    this.selectedBoardSquare$ = this.store.pipe(
      select(BoardSquareSelectors.getSelectedBoardSquare)
    );

    this.currentPlayer$ = this.store.pipe(
      select(PlayerSelectors.getCurrentPlayer)
    );
  }

  public setBoardSquares(boardSquares: IBoardSquare[]) {
    this.store.dispatch(BoardSquareActions.setBoardSquares({ boardSquares }));
  }

  public selectBoardSquare(boardSquare: IBoardSquare) {
    this.store.dispatch(
      BoardSquareActions.setSelectedBoardSquare({ id: boardSquare.id })
    );
  }

  public isBoardSquareSelected(boardSquare: IBoardSquare): Observable<boolean> {
    return this.selectedBoardSquare$.pipe(
      map(selected => selected && boardSquare.id === selected.id)
    );
  }

  public isBoardSquareAvailableForSelection(
    boardSquare: IBoardSquare
  ): Observable<boolean> {
    return this.currentPlayer$.pipe(
      map(player => PlayerUtils.playerHasTile(player, boardSquare.id))
    );
  }
}
