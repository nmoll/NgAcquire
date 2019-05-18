import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AcquireGameComponent } from "./acquire-game/acquire-game.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BoardSquareComponent } from "./board/board-square.component";
import { BoardComponent } from "./board/board.component";
import { PlayerActionMenuComponent } from "./player-action-menu/player-action-menu.component";
import { PlayerDeckComponent } from "./player-deck/player-deck.component";

@NgModule({
  declarations: [
    AppComponent,
    AcquireGameComponent,
    BoardComponent,
    PlayerDeckComponent,
    PlayerActionMenuComponent,
    BoardSquareComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
