import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GamesListComponent } from './games-list/games-list.component';
import { HotelPluhzComponent } from './games/hotel-pluhz/hotel-pluhz.component';
import { LinkButtonComponent } from './link-button/link-button.component';
import { DonTetronolisTetrisComponent } from './games/don-tetronolis-tetris/don-tetronolis-tetris.component';
import { ADreamWithinADreamComponent } from './games/a-dream-within-a-dream/a-dream-within-a-dream.component';
import { PollyComponent } from './games/polly/polly.component';
import { ADreamWithinADreamRemasteredComponent } from './games/a-dream-within-a-dream-remastered/a-dream-within-a-dream-remastered.component';
import { RollingGameComponent } from './games/rolling-game/rolling-game.component';
import { WASDComponent } from './games/wasd/wasd.component';
import { StairComponent } from './games/stair/stair.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    GamesListComponent,
    HotelPluhzComponent,
    LinkButtonComponent,
    DonTetronolisTetrisComponent,
    ADreamWithinADreamComponent,
    PollyComponent,
    ADreamWithinADreamRemasteredComponent,
    RollingGameComponent,
    WASDComponent,
    StairComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
