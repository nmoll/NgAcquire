import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "acquire-player-action-menu",
  templateUrl: "./player-action-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerActionMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
