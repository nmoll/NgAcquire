import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DefaultBoardConfig } from "src/app/board/board-configuration";
import { IBoardSquare } from "src/app/board/board-square";
import { PlayerActionMenuType } from "src/app/player-action-menu/player-action-menu-type";
import { IPlayer } from "src/app/player/player";
import * as BoardUtils from "../../board/board.utils";
import * as PlayerUtils from "../../player/player.utils";
import { PlayerActionMenuFacade } from "../player-action-menu/player-action-menu.facade";
import * as PlayerSelectors from "../player/player.selectors";
import * as BoardSquareActions from "./board-square.actions";
import * as BoardSquareSelectors from "./board-square.selectors";
import { BoardSquaresState } from "./board-square.state";

@Injectable({
  providedIn: "root"
})
export class BoardSquareFacade {
  public boardSquares$: Observable<IBoardSquare[]>;

  public selectedBoardSquare$: Observable<IBoardSquare>;

  private currentPlayer$: Observable<IPlayer>;

  constructor(
    private store: Store<BoardSquaresState>,
    private playerActionMenuFacade: PlayerActionMenuFacade
  ) {
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

  public initLoadBoardSquares() {
    this.store.dispatch(
      BoardSquareActions.setBoardSquares({
        boardSquares: BoardUtils.createBoardSquares(DefaultBoardConfig)
      })
    );
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
    return combineLatest(
      this.currentPlayer$,
      this.playerActionMenuFacade.activeMenuType$
    ).pipe(
      map(
        ([player, actionMenuType]) =>
          actionMenuType === PlayerActionMenuType.PLACE_TILE &&
          PlayerUtils.playerHasTile(player, boardSquare.id)
      )
    );
  }
}
