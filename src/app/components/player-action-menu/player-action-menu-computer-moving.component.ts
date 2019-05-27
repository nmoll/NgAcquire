import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "acquire-player-action-menu-computer-moving",
  template: `
    <div>Waiting for computer to move...</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerActionMenuComputerMovingComponent {}
