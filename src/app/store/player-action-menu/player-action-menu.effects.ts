import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, filter, map, withLatestFrom } from "rxjs/operators";
import { PlayerType } from "src/app/models/player";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import { BoardUtils } from "src/app/utils/board.utils";
import { BoardSquareFacade } from "../board/board-square.facade";
import { PlayerActions } from "../player/player.actions";
import { PlayerFacade } from "../player/player.facade";
import { PlayerActionMenuActions } from "./player-action-menu.actions";

@Injectable({
  providedIn: "root"
})
export class PlayerActionMenuEffects {
  constructor(
    private actions$: Actions,
    private playerFacade: PlayerFacade,
    private boardSquareFacade: BoardSquareFacade
  ) {}

  tilePlaced$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.confirmTilePlacement),
      withLatestFrom(this.playerFacade.currentPlayer$),
      filter(([_, player]) => player.playerType === PlayerType.HUMAN),
      map(_ =>
        PlayerActionMenuActions.setActiveMenuType({
          activeMenuType: PlayerActionMenuType.END_TURN
        })
      )
    )
  );

  tilePlacedByComputer = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.confirmTilePlacement),
      withLatestFrom(this.playerFacade.currentPlayer$),
      filter(([_, player]) => player.playerType === PlayerType.COMPUTER),
      map(_ => PlayerActions.endTurn()),
      delay(1000)
    )
  );

  playerChanged$ = createEffect(() =>
    this.playerFacade.currentPlayerChanged$.pipe(
      map(player =>
        PlayerActionMenuActions.setActiveMenuType({
          activeMenuType:
            player.playerType === PlayerType.HUMAN
              ? PlayerActionMenuType.PLACE_TILE
              : PlayerActionMenuType.COMPUTER_MOVING
        })
      )
    )
  );

  computerMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActionMenuActions.setActiveMenuType),
      filter(
        ({ activeMenuType }) =>
          activeMenuType === PlayerActionMenuType.COMPUTER_MOVING
      ),
      withLatestFrom(
        this.playerFacade.currentPlayer$,
        this.boardSquareFacade.boardSquares$
      ),
      map(([_, player, boardSquares]) =>
        PlayerActions.confirmTilePlacement({
          boardSquare: BoardUtils.findById(
            player.tiles[0].boardSquareId,
            boardSquares
          )
        })
      ),
      delay(1000)
    )
  );
}
