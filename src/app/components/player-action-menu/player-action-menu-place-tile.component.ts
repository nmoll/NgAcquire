import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { BoardSquareSelectedState } from "src/app/models/player-turn";

@Component({
  selector: "acquire-player-action-menu-place-tile",
  template: `
    <button
      [disabled]="!selectedBoardSquareId"
      (click)="onConfirm()"
      class="acquire-button w-full"
    >
      Confirm Placement
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerActionMenuPlaceTileComponent {
  @Input()
  public selectedBoardSquareId: number;

  @Input()
  public boardSquareSelectedState: BoardSquareSelectedState;

  @Output()
  public confirm = new EventEmitter<number>();

  public onConfirm(): void {
    this.confirm.emit(this.selectedBoardSquareId);
  }
}
