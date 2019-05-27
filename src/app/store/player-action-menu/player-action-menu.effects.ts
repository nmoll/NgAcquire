import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import { PlayerActionMenuActions } from "./player-action-menu.actions";

@Injectable({
  providedIn: "root"
})
export class PlayerActionMenuEffects {
  constructor(private actions$: Actions) {}

  tilePlaced$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActionMenuActions.confirmTilePlacement),
      map(_ =>
        PlayerActionMenuActions.setActiveMenuType({
          activeMenuType: PlayerActionMenuType.END_TURN
        })
      )
    )
  );

  playerChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActionMenuActions.endTurn),
      map(_ =>
        PlayerActionMenuActions.setActiveMenuType({
          activeMenuType: PlayerActionMenuType.PLACE_TILE
        })
      )
    )
  );
}
