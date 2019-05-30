import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from "@angular/core";

@Component({
  selector: "acquire-player-action-menu-start-hotel-chain",
  template: `
    <div>Choose hotel chain to start</div>
    <button (click)="hotelSelected.emit(null)" class="acquire-button w-full">
      Select Hotel
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerActionMenuStartHotelChainComponent {
  @Output()
  public hotelSelected = new EventEmitter();
}
