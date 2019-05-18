import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TileBagService } from "../tile/tile-bag.service";
import { IPlayer } from "./player";

export const STARTING_CASH = 6000;
export const MAX_TILES_IN_HAND = 6;

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  public players$: BehaviorSubject<IPlayer[]>;
  public currentPlayer$: BehaviorSubject<IPlayer>;

  constructor(private tileBagService: TileBagService) {
    const players = this.initPlayers();
    this.players$ = new BehaviorSubject(players);
    this.currentPlayer$ = new BehaviorSubject(players[0]);
  }

  private initPlayers(): IPlayer[] {
    return [
      {
        name: "Nate",
        cash: STARTING_CASH,
        tiles: this.tileBagService.takeRandomTiles(MAX_TILES_IN_HAND)
      },
      {
        name: "Kate",
        cash: STARTING_CASH,
        tiles: this.tileBagService.takeRandomTiles(MAX_TILES_IN_HAND)
      },
      {
        name: "Computer",
        cash: STARTING_CASH,
        tiles: this.tileBagService.takeRandomTiles(MAX_TILES_IN_HAND)
      }
    ];
  }
}
