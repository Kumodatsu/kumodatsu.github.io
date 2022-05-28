import { Injectable }     from "@angular/core"
import { Observable, of } from "rxjs"
import { GameData }       from "./game-data"

const gameData: GameData[] = [
  {
    title:     "A Dream within a Dream",
    year:      2015,
    thumbnail: "/assets/game-thumbnails/dream.png",
    contentPath: "/games/a-dream-within-a-dream",
  },
  {
    title:     "Don Tetronoli's Tetris",
    year:      2016,
    thumbnail: "/assets/game-thumbnails/tetris.png",
    contentPath: "/games/don-tetronolis-tetris",
  },
  {
    title:     "Polly",
    year:      2017,
    thumbnail: "/assets/game-thumbnails/polly.png",
    contentPath: "/games/polly",
  },
  {
    title:     "Hotel Pluhz",
    year:      2019,
    thumbnail: "/assets/game-thumbnails/hotel-pluhz.png",
    contentPath: "/games/hotel-pluhz",
  },
  {
    title:     "Rolling Game",
    year:      2021,
    thumbnail: "/assets/game-thumbnails/rolling.png",
    contentPath: "/games/rolling-game",
  },
  {
    title:     "A Dream within a Dream Remastered",
    year:      2021,
    thumbnail: "/assets/game-thumbnails/dream-remastered.png",
    contentPath: "/games/a-dream-within-a-dream-remastered",
  },
  {
    title:     "Stair",
    year:      "TBA",
    thumbnail: "/assets/game-thumbnails/stair.png",
    contentPath: "/games/stair",
  },
  {
    title:     "WASD",
    year:      "TBA",
    thumbnail: "/assets/game-thumbnails/wasd.png",
    contentPath: "/games/wasd",
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
