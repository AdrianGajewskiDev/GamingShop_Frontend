import { Component, OnInit } from "@angular/core";
import { GameService } from "../../shared/Services/game.service";
import { GameIndexModel } from "../../shared/Models/game-index-model";
import { GamesModel } from "../../shared/Models/games-model";
import { GUID } from "../../shared/HelperClasses/GUID";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.css"],
})
export class GamesComponent implements OnInit {
  public gamesModel: GamesModel;
  public games: GameIndexModel[];
  searchQuery: string;
  searching: boolean = false;
  dataLoaded = false;
  constructor(private service: GameService) {}

  ngOnInit() {
    if (localStorage.getItem("searchQuery") != null)
      this.searchQuery = JSON.parse(localStorage.getItem("searchQuery"));

    if (this.searchQuery == "" || this.searchQuery == undefined) {
      this.gamesModel = this.getGames();
    } else {
      this.searching = true;
      this.service
        .getGamesBySearchQuery(this.searchQuery)
        .subscribe(
          (response) => ((this.games = response), (this.dataLoaded = true))
        );
    }

    localStorage.removeItem("searchQuery");
  }

  getGames(): GamesModel {
    let model: GamesModel = new GamesModel();

    this.service.getGames().subscribe((response) => {
      model.XboxOneGames = this.randomizeResult(response.XboxOneGames);
      model.PlaystationGames = this.randomizeResult(response.PlaystationGames);
      model.PCGames = this.randomizeResult(response.PCGames);

      this.dataLoaded = true;
    });

    return model;
  }

  randomizeResult(array: GameIndexModel[]): GameIndexModel[] {
    let min = GUID.getRandomNumber(0, array.length);
    let max = min + 3;

    if (max < array.length)
      return array.sort((a, b) => a.Price - b.Price).slice(min, max);
    else {
      var tooMuch = max - array.length;
      max -= tooMuch;
      min -= tooMuch;

      return array.sort((a, b) => a.Price - b.Price).slice(min, max);
    }
  }
}
