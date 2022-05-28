import { Injectable }     from "@angular/core"
import { Observable, of } from "rxjs"
import { GameData }       from "./game-data"

const gameData: GameData[] = [
  {
    title:     "A Dream within a Dream",
    year:      2015,
    thumbnail: "/assets/game-thumbnails/dream.png",
  },
  {
    title:     "Don Tetronoli's Tetris",
    year:      2016,
    thumbnail: "/assets/game-thumbnails/tetris.png",
  },
  {
    title:     "Polly",
    year:      2017,
    thumbnail: "/assets/game-thumbnails/polly.png",
  },
  {
    title:     "Hotel Pluhz",
    year:      2019,
    thumbnail: "/assets/game-thumbnails/hotel-pluhz.png",
  },
  {
    title:     "Rolling Game",
    year:      2021,
    thumbnail: "/assets/game-thumbnails/rolling.png",
  },
  {
    title:     "A Dream within a Dream Remastered",
    year:      2021,
    thumbnail: "/assets/game-thumbnails/dream-remastered.png",
  },
  {
    title:     "Stair",
    year:      "TBA",
    thumbnail: "/assets/game-thumbnails/stair.png",
  },
  {
    title:     "WASD",
    year:      "TBA",
    thumbnail: "/assets/game-thumbnails/wasd.png",
  },
]

@Injectable({
  providedIn: "root",
})
export class GameDataService {

  getGameData(): Observable<GameData[]> {
    return of(gameData)
  }

}
