import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { BoardSquareFacade } from "../store/board/board-square.facade";
import { IBoardSquare } from "./board-square";
@Component({
  selector: "acquire-board",
  templateUrl: "./board.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  constructor(public boardSquareFacade: BoardSquareFacade) {}

  public isEnabled(boardSquare: IBoardSquare): Observable<boolean> {
    return this.boardSquareFacade.isAvailableForSelection(boardSquare);
  }

  public isSelected(boardSquare: IBoardSquare): Observable<boolean> {
    return this.boardSquareFacade.isSelected(boardSquare);
  }

  public onSelect(boardSquare: IBoardSquare) {
    this.boardSquareFacade.select(boardSquare);
  }
}
