import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { BoardSquareState, IBoardSquare } from "./board-square";

@Component({
  selector: "acquire-board-square",
  templateUrl: "./board-square.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardSquareComponent {
  public state = BoardSquareState;

  @Input()
  public boardSquare: IBoardSquare;

  @Output()
  public selected = new EventEmitter<IBoardSquare>();
}
