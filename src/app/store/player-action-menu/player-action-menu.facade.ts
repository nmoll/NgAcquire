import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import { PlayerActionMenuSelectors } from "./player-action-menu.selectors";
import { IPlayerActionMenuState } from "./player-action-menu.state";

@Injectable({
  providedIn: "root"
})
export class PlayerActionMenuFacade {
  public activeMenuType$: Observable<PlayerActionMenuType>;

  constructor(private store: Store<IPlayerActionMenuState>) {
    this.activeMenuType$ = this.store.pipe(
      select(PlayerActionMenuSelectors.getActiveMenuType)
    );
  }
}
