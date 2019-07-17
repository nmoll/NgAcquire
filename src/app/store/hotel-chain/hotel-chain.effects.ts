import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, withLatestFrom } from "rxjs/operators";
import { HumanPlayerActions } from "../player/player.actions";
import { TileFacade } from "../tile/tile.facade";
import { HotelChainActions } from "./hotel-chain.actions";

@Injectable({
  providedIn: "root"
})
export class HotelChainEffects {
  constructor(private actions$: Actions, private tileFacade: TileFacade) {}

  starterHotelSetTileIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.starterHotelChainChosen),
      withLatestFrom(
        this.tileFacade.lastPlayedTileId$,
        this.tileFacade.adjacentTilesIdsToLastPlayed$
      ),
      map(([{ hotelChain }, tileId, adjacentTileIds]) =>
        HotelChainActions.starterHotelChainSetTileIds({
          hotelChain,
          tileIds: [tileId, ...adjacentTileIds]
        })
      )
    )
  );
}
