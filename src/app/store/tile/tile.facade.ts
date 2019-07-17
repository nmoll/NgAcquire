import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "../app-state";
import { TileSelectors } from "./tile.selectors";

@Injectable({
  providedIn: "root"
})
export class TileFacade {
  public tilesInBag$: Observable<number[]>;

  public lastPlayedTileId$: Observable<number>;

  public adjacentTilesIdsToLastPlayed$: Observable<number[]>;

  constructor(private store: Store<IAppState>) {
    this.tilesInBag$ = this.store.pipe(
      select(TileSelectors.getAvailableTileIds)
    );
    this.lastPlayedTileId$ = this.store.pipe(
      select(TileSelectors.getLastPlayedTileId)
    );
    this.adjacentTilesIdsToLastPlayed$ = this.store.pipe(
      select(TileSelectors.getAdjacentTilesIdsToLastPlayed)
    );
  }
}
