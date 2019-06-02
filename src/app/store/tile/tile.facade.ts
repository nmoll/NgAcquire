import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DefaultBoardConfig } from "src/app/config/board-config";
import { ITile } from "src/app/models/tile";
import { TileUtils } from "src/app/utils/tile.utils";
import { TileActions } from "./tile.actions";
import { TileSelectors } from "./tile.selectors";
import { TileState } from "./tile.state";

@Injectable({
  providedIn: "root"
})
export class TileFacade {
  public tilesInBag$: Observable<ITile[]>;

  public lastPlayedTile$: Observable<ITile>;

  public adjacentTilesToLastPlayedTile$: Observable<ITile[]>;

  constructor(private store: Store<TileState>) {
    this.tilesInBag$ = this.store.pipe(select(TileSelectors.getAvailableTiles));
    this.lastPlayedTile$ = this.store.pipe(
      select(TileSelectors.getLastPlayedTile)
    );
    this.adjacentTilesToLastPlayedTile$ = this.store.pipe(
      select(TileSelectors.getAdjacentTilesToLastPlayedTile)
    );
  }

  public getPlayedTileAtPosition(
    positionX: number,
    positionY: number
  ): Observable<ITile> {
    return this.store.pipe(
      select(TileSelectors.getPlayedTileAtPosition, { positionX, positionY })
    );
  }

  public loadTiles(): void {
    this.store.dispatch(
      TileActions.setTiles({ tiles: TileUtils.createTiles(DefaultBoardConfig) })
    );
  }
}
