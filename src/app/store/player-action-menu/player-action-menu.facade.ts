import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IBoardSquare } from "src/app/board/board-square";
import { PlayerActionMenuType } from "src/app/player-action-menu/player-action-menu-type";
import { PlayerActionMenuActions } from "./player-action-menu.actions";
import { PlayerActionMenuSelectors } from "./player-action-menu.selectors";
import { PlayerActionMenuState } from "./player-action-menu.state";

@Injectable({
  providedIn: "root"
})
export class PlayerActionMenuFacade {
  public activeMenuType$: Observable<PlayerActionMenuType>;

  constructor(private store: Store<PlayerActionMenuState>) {
    this.activeMenuType$ = this.store.pipe(
      select(PlayerActionMenuSelectors.getActiveMenuType)
    );
  }

  public confirmTilePlacement(boardSquare: IBoardSquare): void {
    this.store.dispatch(
      PlayerActionMenuActions.confirmTilePlacement({ boardSquare })
    );
  }

  public endTurn(): void {
    this.store.dispatch(PlayerActionMenuActions.endTurn());
  }
}
