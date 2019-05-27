import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";
import { PlayerActions } from "../player/player.actions";
import { TileFacade } from "../tile/tile.facade";
import { BoardSquareActions } from "./board-square.actions";

@Injectable({
  providedIn: "root"
})
export class BoardSquareEffects {
  constructor(private actions$: Actions, private tileFacade: TileFacade) {}

  tilePlaced$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.confirmTilePlacement),
      mergeMap(({ boardSquare }) =>
        of(boardSquare).pipe(
          withLatestFrom(this.tileFacade.getTileById(boardSquare.id))
        )
      ),
      map(([boardSquare, tile]) =>
        BoardSquareActions.updateBoardSquare({
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
