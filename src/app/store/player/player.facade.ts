import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { IBoardSquare } from "src/app/models/board-square";
import { IPlayer } from "src/app/models/player";
import { PlayerActions } from "../player/player.actions";
import { PlayerSelectors } from "../player/player.selectors";
import { PlayerState } from "../player/player.state";

@Injectable({
  providedIn: "root"
})
export class PlayerFacade {
  public players$: Observable<IPlayer[]>;

  public currentPlayer$: Observable<IPlayer>;

  public currentPlayerChanged$: Observable<IPlayer>;

  constructor(private store: Store<PlayerState>) {
    this.players$ = this.store.pipe(select(PlayerSelectors.getAllPlayers));

    this.currentPlayer$ = this.store.pipe(
      select(PlayerSelectors.getCurrentPlayer)
    );

    this.currentPlayerChanged$ = this.currentPlayer$.pipe(
      filter(player => !!player),
      distinctUntilChanged((p1, p2) => p1.id === p2.id)
    );
  }

  public loadPlayers() {
    this.store.dispatch(PlayerActions.loadPlayers());
  }

  public setCurrentPlayer(player: IPlayer) {
    this.store.dispatch(PlayerActions.setCurrentPlayer({ id: player.id }));
  }

  public confirmTilePlacement(boardSquare: IBoardSquare): void {
    this.store.dispatch(PlayerActions.confirmTilePlacement({ boardSquare }));
  }

  public endTurn(): void {
    this.store.dispatch(PlayerActions.endTurn());
  }
}
