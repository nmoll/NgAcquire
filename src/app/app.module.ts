import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { AcquireGameComponent } from "./acquire-game/acquire-game.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BoardSquareComponent } from "./board/board-square.component";
import { BoardComponent } from "./board/board.component";
import { PlayerActionMenuComponent } from "./player-action-menu/player-action-menu.component";
import { PlayerDeckComponent } from "./player-deck/player-deck.component";
import { reducers } from "./store";

@NgModule({
  declarations: [
    AppComponent,
    AcquireGameComponent,
    BoardComponent,
    PlayerDeckComponent,
    PlayerActionMenuComponent,
    BoardSquareComponent
  ],
  imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot(reducers)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
