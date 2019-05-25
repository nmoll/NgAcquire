import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { IBoardSquare } from "./board-square";

@Component({
  selector: "acquire-board-square",
  templateUrl: "./board-square.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardSquareComponent {
  @Input()
  public boardSquare: IBoardSquare;

  @Input()
  public selected: boolean;

  @Input()
  public enabled: boolean;

  @Output()
  public select = new EventEmitter<IBoardSquare>();
}
