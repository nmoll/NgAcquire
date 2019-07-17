import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AcquireGameComponent } from "./components/acquire-game/acquire-game.component";
import { BoardSquareStatePipe } from "./components/board/board-square-state.pipe";
import { BoardComponent } from "./components/board/board.component";
import { PlayerActionMenuComputerMovingComponent } from "./components/player-action-menu/player-action-menu-computer-moving.component";
import { PlayerActionMenuEndTurn } from "./components/player-action-menu/player-action-menu-end-turn.component";
import { PlayerActionMenuPlaceTileComponent } from "./components/player-action-menu/player-action-menu-place-tile.component";
import { PlayerActionMenuStartHotelChainComponent } from "./components/player-action-menu/player-action-menu-start-hotel-chain.component";
import { PlayerActionMenuComponent } from "./components/player-action-menu/player-action-menu.component";
import { PlayerDeckComponent } from "./components/player-deck/player-deck.component";
import { reducers } from "./store";
import { HotelChainEffects } from "./store/hotel-chain/hotel-chain.effects";
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
    PlayerActionMenuComputerMovingComponent,
    PlayerActionMenuStartHotelChainComponent,
    PlayerActionMenuEndTurn,
    BoardSquareStatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      PlayerEffects,
      PlayerActionMenuEffects,
      HotelChainEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
