import { Component, OnInit } from "@angular/core";
import { BoardSquareFacade } from "../store/board/board-square.facade";
import { PlayerFacade } from "../store/player/player.facade";
import { TileFacade } from "../store/tile/tile.facade";

@Component({
  selector: "acquire-game",
  templateUrl: "./acquire-game.component.html"
})
export class AcquireGameComponent implements OnInit {
  constructor(
    public boardSquareFacade: BoardSquareFacade,
    public tileFacade: TileFacade,
    public playerFacade: PlayerFacade
  ) {}

  ngOnInit() {
    this.boardSquareFacade.initLoadBoardSquares();
    this.tileFacade.initLoadTiles();
    this.playerFacade.loadPlayers();
  }
}
