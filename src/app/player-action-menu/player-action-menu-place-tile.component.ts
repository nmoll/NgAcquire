import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IBoardSquare } from "../board/board-square";

@Component({
  selector: "acquire-player-action-menu-place-tile",
  template: `
    <button [disabled]="!selectedBoardSquare" (click)="onConfirm()">
      Confirm Placement
    </button>
  `
})
export class PlayerActionMenuPlaceTileComponent {
  @Input()
  public selectedBoardSquare: IBoardSquare;

  @Output()
  public confirm = new EventEmitter<IBoardSquare>();

  public onConfirm(): void {
    this.confirm.emit(this.selectedBoardSquare);
  }
}
