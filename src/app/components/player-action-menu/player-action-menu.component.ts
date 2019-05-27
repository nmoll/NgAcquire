import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoardSquareFacade } from "src/app/store/board/board-square.facade";
import { PlayerActionMenuFacade } from "src/app/store/player-action-menu/player-action-menu.facade";
import { PlayerActionMenuType } from "../../models/player-action-menu-type";

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
