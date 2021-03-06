import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from "@angular/core";

@Component({
  selector: "acquire-player-action-menu-end-turn",
  template: `
    <button (click)="endTurn.emit()" class="acquire-button w-full">
      End Turn
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerActionMenuEndTurn {
  @Output()
  public endTurn = new EventEmitter();
}
