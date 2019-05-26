import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";
import * as PlayerActionMenuActions from "../player-action-menu/player-action-menu.actions";
import { TileFacade } from "../tile/tile.facade";
import * as BoardSquareActions from "./board-square.actions";

@Injectable({
  providedIn: "root"
})
export class BoardSquareEffects {
  constructor(private actions$: Actions, private tileFacade: TileFacade) {}

  tilePlaced$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActionMenuActions.confirmTilePlacement),
      mergeMap(({ boardSquare }) =>
        of(boardSquare).pipe(
          withLatestFrom(this.tileFacade.getTileById(boardSquare.id))
        )
      ),
      map(([boardSquare, tile]) =>
        BoardSquareActions.tilePlacedUpdateBoardSquareTile({
          update: {
            id: boardSquare.id,
            changes: {
              tile
            }
          }
        })
      )
    )
  );
}
