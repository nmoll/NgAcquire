import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DefaultBoardConfig } from "src/app/board/board-configuration";
import { ITile } from "src/app/tile/tile";
import * as TileUtils from "../../tile/tile.utils";
import { TileActions } from "./tile.actions";
import { TileSelectors } from "./tile.selectors";
import { TileState } from "./tile.state";

@Injectable({
  providedIn: "root"
})
export class TileFacade {
  public tilesInBag$: Observable<ITile[]>;

  constructor(private store: Store<TileState>) {
    this.tilesInBag$ = this.store.pipe(select(TileSelectors.getAvailableTiles));
  }

  public getTileById(boardSquareId: number): Observable<ITile> {
    return this.store.pipe(
      select(TileSelectors.getTileById, { id: boardSquareId })
    );
  }

  public loadTiles(): void {
    this.store.dispatch(
      TileActions.setTiles({ tiles: TileUtils.createTiles(DefaultBoardConfig) })
    );
  }
}
