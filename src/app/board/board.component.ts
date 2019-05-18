import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { IPlayer } from "../player/player";
import { IBoardSquare } from "./board-square";

@Component({
  selector: "acquire-board",
  templateUrl: "./board.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  @Input()
  public boardSquares: IBoardSquare[];

  @Input()
  public currentPlayer: IPlayer;

  @Output()
  public boardSquareSelected = new EventEmitter<IBoardSquare>();
}
