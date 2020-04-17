import { Component, OnInit } from "@angular/core";
import { GameService } from "../../shared/Services/game.service";
import { GameIndexModel } from "../../shared/Models/game-index-model";
import { GamesIndexModel } from "src/app/shared/Models/games-index-model";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.css"],
})
export class GamesComponent implements OnInit {
  public gamesModel: GamesIndexModel;
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

  getGames(): GamesIndexModel {
    let model: GamesIndexModel = new GamesIndexModel();

    this.service.getGames().subscribe((response) => {
      model.XboxOneGames = response.XboxOneGames;
      model.PlaystationGames = response.PlaystationGames;
      model.PCGames = response.PCGames;

      this.dataLoaded = true;
    });

    return model;
  }
}
