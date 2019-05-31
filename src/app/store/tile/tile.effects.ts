import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable({
  providedIn: "root"
})
export class TileEffects {
  constructor(private actions$: Actions) {}

  // setHotelChainOnStarterPlayed$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(HumanPlayerActions.starterHotelChainChosen, ComputerPlayerActions.starterHotelChainChosen),
  //     map({  })
  //   )
  // )
}
