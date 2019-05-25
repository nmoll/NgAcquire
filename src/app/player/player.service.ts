import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as PlayerActions from "../store/player/player.actions";
import * as PlayerSelectors from "../store/player/player.selectors";
import { PlayerState } from "../store/player/player.state";
import { TileBagService } from "../tile/tile-bag.service";
import { IPlayer } from "./player";
import { DefaultPlayerConfig, IPlayerConfig } from "./player-config";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  public players$: Observable<IPlayer[]>;

  public currentPlayer$: Observable<IPlayer>;

  constructor(
    private store: Store<PlayerState>,
    private tileBagService: TileBagService
  ) {
    this.players$ = this.store.pipe(select(PlayerSelectors.selectAllPlayers));

    this.currentPlayer$ = this.store.pipe(
      select(PlayerSelectors.getCurrentPlayer)
    );
  }

  public loadPlayers() {
    const players = this.initMockPlayers(DefaultPlayerConfig);
    const currentPlayer = players[0];

    this.setPlayers(players);
    this.setCurrentPlayer(currentPlayer);
  }

  public setPlayers(players: IPlayer[]) {
    this.store.dispatch(PlayerActions.setPlayers({ players }));
  }

  public setCurrentPlayer(player: IPlayer) {
    this.store.dispatch(PlayerActions.setCurrentPlayer({ id: player.id }));
  }

  private initMockPlayers(playerConfig: IPlayerConfig): IPlayer[] {
    return [
      {
        id: 1,
        name: "Nate",
        cash: playerConfig.startingCash,
        tiles: this.tileBagService.takeRandomTiles(playerConfig.maxTilesInHand)
      },
      {
        id: 2,
        name: "Kate",
        cash: playerConfig.startingCash,
        tiles: this.tileBagService.takeRandomTiles(playerConfig.maxTilesInHand)
      },
      {
        id: 3,
        name: "Computer",
        cash: playerConfig.startingCash,
        tiles: this.tileBagService.takeRandomTiles(playerConfig.maxTilesInHand)
      }
    ];
  }
}
