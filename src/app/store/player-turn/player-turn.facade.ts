import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IPlayerTurn } from "src/app/models/player-turn";
import { PlayerTurnSelectors } from "./player-turn.selectors";
import { IPlayerTurnState } from "./player-turn.state";

@Injectable({
  providedIn: "root"
})
export class PlayerTurnFacade {
  public currentPlayerTurn$: Observable<IPlayerTurn>;

  constructor(private store: Store<IPlayerTurnState>) {
    this.currentPlayerTurn$ = this.store.pipe(
      select(PlayerTurnSelectors.getCurrentPlayerTurn)
    );
  }
}
