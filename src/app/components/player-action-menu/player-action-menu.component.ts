import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoardSquareFacade } from "src/app/store/board/board-square.facade";
import { HotelChainFacade } from "src/app/store/hotel-chain/hotel-chain.facade";
import { PlayerActionMenuFacade } from "src/app/store/player-action-menu/player-action-menu.facade";
import { PlayerTurnFacade } from "src/app/store/player-turn/player-turn.facade";
import { PlayerFacade } from "src/app/store/player/player.facade";
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
    public playerActionMenuFacade: PlayerActionMenuFacade,
    public playerFacade: PlayerFacade,
    public hotelChainFacade: HotelChainFacade,
    public playerTurnFacade: PlayerTurnFacade
  ) {}
}
