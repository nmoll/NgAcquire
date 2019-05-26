import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoardSquareFacade } from "../store/board/board-square.facade";
import { PlayerActionMenuFacade } from "../store/player-action-menu/player-action-menu.facade";
import { PlayerActionMenuType } from "./player-action-menu-type";

@Component({
  selector: "acquire-player-action-menu",
  templateUrl: "./player-action-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerActionMenuComponent {
  public actionMenuType = PlayerActionMenuType;

  constructor(
    public boardSquareFacade: BoardSquareFacade,
    public playerActionMenuFacade: PlayerActionMenuFacade
  ) {}
}
