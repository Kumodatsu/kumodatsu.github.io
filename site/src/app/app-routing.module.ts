import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { GamesListComponent } from "./games-list/games-list.component"
import { ADreamWithinADreamRemasteredComponent } from "./games/a-dream-within-a-dream-remastered/a-dream-within-a-dream-remastered.component"
import { ADreamWithinADreamComponent } from "./games/a-dream-within-a-dream/a-dream-within-a-dream.component"
import { DonTetronolisTetrisComponent } from "./games/don-tetronolis-tetris/don-tetronolis-tetris.component"
import { HotelPluhzComponent } from "./games/hotel-pluhz/hotel-pluhz.component"
import { PollyComponent } from "./games/polly/polly.component"
import { RollingGameComponent } from "./games/rolling-game/rolling-game.component"
import { StairComponent } from "./games/stair/stair.component"
import { WASDComponent } from "./games/wasd/wasd.component"
import { MainComponent } from "./main/main.component"

const routes: Routes = [
  { path: "", component: GamesListComponent },
  { path: "main",  component: MainComponent },
  { path: "games/a-dream-within-a-dream",
  component: ADreamWithinADreamComponent },
  { path: "games/don-tetronolis-tetris",
  component: DonTetronolisTetrisComponent },
  { path: "games/polly", component: PollyComponent },
  { path: "games/hotel-pluhz", component: HotelPluhzComponent },
  { path: "games/a-dream-within-a-dream-remastered",
    component: ADreamWithinADreamRemasteredComponent },
  { path: "games/rolling-game", component: RollingGameComponent },
  { path: "games/wasd", component: WASDComponent },
  { path: "games/stair", component: StairComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
