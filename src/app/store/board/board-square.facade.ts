import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DefaultBoardConfig } from "src/app/config/board-config";
import { IBoardSquare } from "src/app/models/board-square";
import { IPlayer } from "src/app/models/player";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import { BoardUtils } from "src/app/utils/board.utils";
import { PlayerUtils } from "src/app/utils/player.utils";
import { PlayerActionMenuFacade } from "../player-action-menu/player-action-menu.facade";
import { PlayerSelectors } from "../player/player.selectors";
import { BoardSquareActions } from "./board-square.actions";
import { BoardSquareSelectors } from "./board-square.selectors";
import { BoardSquareState } from "./board-square.state";

@Injectable({
  providedIn: "root"
})
export class BoardSquareFacade {
  public boardSquares$: Observable<IBoardSquare[]>;

  public selectedBoardSquare$: Observable<IBoardSquare>;

  private currentPlayer$: Observable<IPlayer>;

  constructor(
    private store: Store<BoardSquareState>,
    private playerActionMenuFacade: PlayerActionMenuFacade
  ) {
    this.boardSquares$ = this.store.pipe(
      select(BoardSquareSelectors.getAllBoardSquares)
    );

    this.selectedBoardSquare$ = this.store.pipe(
      select(BoardSquareSelectors.getSelectedBoardSquare)
    );

    this.currentPlayer$ = this.store.pipe(
      select(PlayerSelectors.getCurrentPlayer)
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

  public isSelected(boardSquare: IBoardSquare): Observable<boolean> {
    return this.selectedBoardSquare$.pipe(
      map(selected => selected && boardSquare.id === selected.id)
    );
  }

  public isAvailableForSelection(
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
