import { Injectable } from "@angular/core";
import { DefaultBoardConfig } from "../board/board-configuration";
import { ITile } from "./tile";

@Injectable({
  providedIn: "root"
})
export class TileBagService {
  private _tilesInBag: ITile[];

  constructor() {
    this._tilesInBag = this.initTiles();
  }

  takeRandomTiles(numberOfTiles: number): ITile[] {
    const result = [];
    for (let i = 0; i < numberOfTiles; i++) {
      result.push(this.takeRandomTile());
    }
    return result;
  }

  takeRandomTile(): ITile {
    var randomIdx = Math.floor(Math.random() * this._tilesInBag.length);
    var tile = this._tilesInBag.splice(randomIdx, 1)[0];
    return tile;
  }

  private initTiles(): ITile[] {
    const tiles: ITile[] = [];
    var boardSquareId = 1;
    for (
      var positionY = 1;
      positionY <= DefaultBoardConfig.height;
      positionY++
    ) {
      for (
        var positionX = 1;
        positionX <= DefaultBoardConfig.width;
        positionX++
      ) {
        tiles.push({
          boardSquareId: boardSquareId++
        });
      }
    }
    return tiles;
  }
}
