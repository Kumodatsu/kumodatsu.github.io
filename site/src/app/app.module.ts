import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GamesListComponent } from './games-list/games-list.component';
import { HotelPluhzComponent } from './games/hotel-pluhz/hotel-pluhz.component';
import { LinkButtonComponent } from './link-button/link-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    GamesListComponent,
    HotelPluhzComponent,
    LinkButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
