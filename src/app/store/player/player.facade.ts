import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { IHotelChain } from "src/app/models/hotel-chain";
import { IPlayer } from "src/app/models/player";
import { HumanPlayerActions, PlayerActions } from "../player/player.actions";
import { PlayerSelectors } from "../player/player.selectors";
import { IPlayerState } from "../player/player.state";

@Injectable({
  providedIn: "root"
})
export class PlayerFacade {
  public players$: Observable<IPlayer[]>;

  public currentPlayer$: Observable<IPlayer>;

  public currentPlayerChanged$: Observable<IPlayer>;

  constructor(private store: Store<IPlayerState>) {
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

  public confirmTilePlacement(boardSquareId: number): void {
    this.store.dispatch(
      HumanPlayerActions.confirmTilePlacement({ boardSquareId })
    );
  }

  public starterHotelChainChosen(hotelChain: IHotelChain): void {
    this.store.dispatch(
      HumanPlayerActions.starterHotelChainChosen({ hotelChain })
    );
  }

  public endTurn(): void {
    this.store.dispatch(HumanPlayerActions.endTurn());
  }
}
