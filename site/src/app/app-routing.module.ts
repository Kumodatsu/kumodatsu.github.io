import { NgModule }             from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { GamesListComponent }   from "./games-list/games-list.component"
import { HotelPluhzComponent } from "./games/hotel-pluhz/hotel-pluhz.component"
import { MainComponent }        from "./main/main.component"

const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },

  { path: "main",  component: MainComponent },
  { path: "games", component: GamesListComponent },
  { path: "games/hotel-pluhz", component: HotelPluhzComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
