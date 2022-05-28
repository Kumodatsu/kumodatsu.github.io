import { Component, OnInit } from "@angular/core"
import { GameData }          from "../game-data"
import { GameDataService }   from "../game-data.service"

@Component({
  selector:    "app-games-list",
  templateUrl: "./games-list.component.html",
  styleUrls:   ["./games-list.component.css"]
})
export class GamesListComponent implements OnInit {

  gameData: GameData[] = []

  constructor(private gameDataService: GameDataService) {}

  ngOnInit(): void {
    this.gameDataService.getGameData().subscribe(
      gameData => this.gameData = gameData.sort(
        (a, b) => a.year === "TBA" ? -1
                : b.year === "TBA" ?  1
                : b.year - a.year
      )
    )
  }

}
