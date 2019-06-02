import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import { BoardSquareFacade } from "../board/board-square.facade";
import {
  ComputerPlayerActions,
  HumanPlayerActions
} from "../player/player.actions";
import { PlayerActionMenuActions } from "./player-action-menu.actions";

@Injectable({
  providedIn: "root"
})
export class PlayerActionMenuEffects {
  constructor(
    private actions$: Actions,
    private boardSquareFacade: BoardSquareFacade
  ) {}

  showEndTurnMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.confirmTilePlacement),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          add: PlayerActionMenuType.END_TURN,
          removeCurrent: true
        })
      )
    )
  );

  // showChooseHotelChainToStartMenu$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(HumanPlayerActions.confirmTilePlacement),
  //     tap(({ boardSquare }) => console.log("placed", boardSquare)),
  //     withLatestFrom(this.boardSquareFacade.boardSquares$),
  //     filter(([{ boardSquare }, boardSquares]) =>
  //       BoardUtils.hasAdjacentTile(boardSquare, boardSquares)
  //     ),
  //     tap(() => console.log("has adjacent tiles")),
  //     map(_ =>
  //       PlayerActionMenuActions.updateActionMenuQueue({
  //         add: PlayerActionMenuType.START_HOTEL_CHAIN,
  //         removeCurrent: false
  //       })
  //     )
  //   )
  // );

  removeChooseHotelChainToStartMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.starterHotelChainChosen),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          removeCurrent: true
        })
      )
    )
  );

  showPlaceTileMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.turnStarted),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          add: PlayerActionMenuType.PLACE_TILE,
          removeCurrent: true
        })
      )
    )
  );

  showComputerMovingMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComputerPlayerActions.turnStarted),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          add: PlayerActionMenuType.COMPUTER_MOVING,
          removeCurrent: true
        })
      )
    )
  );
}
