import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { ITile } from "src/app/models/tile";
import { BoardSquareFacade } from "src/app/store/board/board-square.facade";
import { TileFacade } from "src/app/store/tile/tile.facade";
import { IBoardSquare } from "../../models/board-square";
@Component({
  selector: "acquire-board",
  templateUrl: "./board.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  constructor(
    public boardSquareFacade: BoardSquareFacade,
    public tileFacade: TileFacade
  ) {}

  public isEnabled(boardSquare: IBoardSquare): Observable<boolean> {
    return this.boardSquareFacade.isAvailableForSelection(boardSquare);
  }

  public isSelected(boardSquare: IBoardSquare): Observable<boolean> {
    return this.boardSquareFacade.isSelected(boardSquare);
  }

  public getPlayedTile(boardSquare: IBoardSquare): Observable<ITile> {
    return this.tileFacade.getPlayedTileAtPosition(
      boardSquare.positionX,
      boardSquare.positionY
    );
  }

  public onSelect(boardSquare: IBoardSquare): void {
    this.boardSquareFacade.select(boardSquare);
  }
}
