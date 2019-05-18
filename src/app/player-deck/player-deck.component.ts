import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IPlayer } from "../player/player";

@Component({
  selector: "acquire-player-deck",
  templateUrl: "./player-deck.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDeckComponent {
  @Input()
  public players: IPlayer[];
}
