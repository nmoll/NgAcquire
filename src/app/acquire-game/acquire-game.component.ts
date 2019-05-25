import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../player/player.service";

@Component({
  selector: "acquire-game",
  templateUrl: "./acquire-game.component.html"
})
export class AcquireGameComponent implements OnInit {
  constructor(public playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.loadPlayers();
  }
}
