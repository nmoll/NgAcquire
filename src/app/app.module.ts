import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AcquireGameComponent } from "./acquire-game/acquire-game.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BoardSquareComponent } from "./board/board-square.component";
import { BoardComponent } from "./board/board.component";
import { PlayerActionMenuEndTurn } from "./player-action-menu/player-action-menu-end-turn.component";
import { PlayerActionMenuPlaceTileComponent } from "./player-action-menu/player-action-menu-place-tile.component";
import { PlayerActionMenuComponent } from "./player-action-menu/player-action-menu.component";
import { PlayerDeckComponent } from "./player-deck/player-deck.component";
import { reducers } from "./store";
import { BoardSquareEffects } from "./store/board/board-square.effects";
import { PlayerActionMenuEffects } from "./store/player-action-menu/player-action-menu.effects";
import { PlayerEffects } from "./store/player/player.effects";

@NgModule({
  declarations: [
    AppComponent,
    AcquireGameComponent,
    BoardComponent,
    PlayerDeckComponent,
    PlayerActionMenuComponent,
    PlayerActionMenuPlaceTileComponent,
    PlayerActionMenuEndTurn,
    BoardSquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      BoardSquareEffects,
      PlayerEffects,
      PlayerActionMenuEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
