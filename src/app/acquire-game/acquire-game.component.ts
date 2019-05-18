import { Component, OnInit } from "@angular/core";
import { BoardService } from "../board/board.service";
import { PlayerService } from "../player/player.service";

@Component({
  selector: "acquire-game",
  templateUrl: "./acquire-game.component.html"
})
export class AcquireGameComponent implements OnInit {
  constructor(
    public playerService: PlayerService,
    public boardService: BoardService
  ) {}

  ngOnInit() {}
}
