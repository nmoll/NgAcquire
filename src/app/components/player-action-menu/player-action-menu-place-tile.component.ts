import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

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

  @Output()
  public confirm = new EventEmitter<number>();

  public onConfirm(): void {
    this.confirm.emit(this.selectedBoardSquareId);
  }
}
