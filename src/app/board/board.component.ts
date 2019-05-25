import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DefaultBoardConfig } from "./board-configuration";
import { IBoardSquare } from "./board-square";
import { BoardService } from "./board.service";
import * as BoardUtils from "./board.utils";
@Component({
  selector: "acquire-board",
  templateUrl: "./board.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  constructor(public boardService: BoardService) {}

  public ngOnInit(): void {
    this.boardService.setBoardSquares(
      BoardUtils.createBoardSquares(DefaultBoardConfig)
    );
  }

  public isEnabled(boardSquare: IBoardSquare): Observable<boolean> {
    return this.boardService.isBoardSquareAvailableForSelection(boardSquare);
  }

  public isSelected(boardSquare: IBoardSquare): Observable<boolean> {
    return this.boardService.isBoardSquareSelected(boardSquare);
  }

  public onSelect(boardSquare: IBoardSquare) {
    this.boardService.selectBoardSquare(boardSquare);
  }
}
