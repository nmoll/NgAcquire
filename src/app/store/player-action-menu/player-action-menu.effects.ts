import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import {
  ComputerPlayerActions,
  HumanPlayerActions
} from "../player/player.actions";
import { PlayerFacade } from "../player/player.facade";
import { PlayerActionMenuActions } from "./player-action-menu.actions";

@Injectable({
  providedIn: "root"
})
export class PlayerActionMenuEffects {
  constructor(private actions$: Actions, private playerFacade: PlayerFacade) {}

  tilePlaced$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.confirmTilePlacement),
      map(_ =>
        PlayerActionMenuActions.setActiveMenuType({
          activeMenuType: PlayerActionMenuType.END_TURN
        })
      )
    )
  );

  onTurnStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.turnStarted),
      map(_ =>
        PlayerActionMenuActions.setActiveMenuType({
          activeMenuType: PlayerActionMenuType.PLACE_TILE
        })
      )
    )
  );

  onComputerTurnStart = createEffect(() =>
    this.actions$.pipe(
      ofType(ComputerPlayerActions.turnStarted),
      map(_ =>
        PlayerActionMenuActions.setActiveMenuType({
          activeMenuType: PlayerActionMenuType.COMPUTER_MOVING
        })
      )
    )
  );
}
