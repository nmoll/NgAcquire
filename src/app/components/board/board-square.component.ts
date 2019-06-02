import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { ITile } from "src/app/models/tile";
import { IBoardSquare } from "../../models/board-square";

@Component({
  selector: "acquire-board-square",
  templateUrl: "./board-square.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardSquareComponent {
  @Input()
  public boardSquare: IBoardSquare;

  @Input()
  public tile: ITile;

  @Input()
  public selected: boolean;

  @Input()
  public enabled: boolean;

  @Output()
  public select = new EventEmitter<IBoardSquare>();
}
