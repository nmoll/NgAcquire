import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoardSquareFacade } from "src/app/store/board/board-square.facade";
import { IBoardSquare } from "../../models/board-square";
@Component({
  selector: "acquire-board",
  templateUrl: "./board.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  constructor(public boardSquareFacade: BoardSquareFacade) {}

  public onSelect(boardSquare: IBoardSquare): void {
    if (boardSquare.state.type === "AvailableForSelection") {
      this.boardSquareFacade.select(boardSquare);
    }
  }
}
