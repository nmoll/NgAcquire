import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcquireGameComponent } from "./components/acquire-game/acquire-game.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "acquire"
  },
  {
    path: "acquire",
    component: AcquireGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
