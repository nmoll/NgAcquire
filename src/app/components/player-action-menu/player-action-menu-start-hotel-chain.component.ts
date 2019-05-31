import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { IHotelChain } from "src/app/models/hotel-chain";

@Component({
  selector: "acquire-player-action-menu-start-hotel-chain",
  template: `
    <div>Choose hotel chain to start</div>
    <button
      *ngFor="let hotelChain of hotelChains"
      (click)="hotelSelected.emit(hotelChain)"
      class="acquire-button w-full mb-3"
    >
      {{ hotelChain.name }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerActionMenuStartHotelChainComponent {
  @Input()
  public hotelChains: IHotelChain[];

  @Output()
  public hotelSelected = new EventEmitter<IHotelChain>();
}
