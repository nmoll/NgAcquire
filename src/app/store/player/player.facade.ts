import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IPlayer } from "../../player/player";
import { PlayerActions } from "../player/player.actions";
import { PlayerSelectors } from "../player/player.selectors";
import { PlayerState } from "../player/player.state";

@Injectable({
  providedIn: "root"
})
export class PlayerFacade {
  public players$: Observable<IPlayer[]>;

  public currentPlayer$: Observable<IPlayer>;

  constructor(private store: Store<PlayerState>) {
    this.players$ = this.store.pipe(select(PlayerSelectors.getAllPlayers));

    this.currentPlayer$ = this.store.pipe(
      select(PlayerSelectors.getCurrentPlayer)
    );
  }

  public loadPlayers() {
    this.store.dispatch(PlayerActions.loadPlayers());
  }

  public setCurrentPlayer(player: IPlayer) {
    this.store.dispatch(PlayerActions.setCurrentPlayer({ id: player.id }));
  }
}