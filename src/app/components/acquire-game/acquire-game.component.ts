import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BoardSquareFacade } from "src/app/store/board/board-square.facade";
import { HotelChainFacade } from "src/app/store/hotel-chain/hotel-chain.facade";
import { PlayerFacade } from "src/app/store/player/player.facade";
import { TileFacade } from "src/app/store/tile/tile.facade";

@Component({
  selector: "acquire-game",
  templateUrl: "./acquire-game.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcquireGameComponent implements OnInit {
  constructor(
    public boardSquareFacade: BoardSquareFacade,
    public tileFacade: TileFacade,
    public playerFacade: PlayerFacade,
    public hotelChainFacade: HotelChainFacade
  ) {}

  ngOnInit() {
    this.hotelChainFacade.loadHotelChains();
    this.boardSquareFacade.loadBoardSquares();
    this.playerFacade.loadPlayers();
  }
}
