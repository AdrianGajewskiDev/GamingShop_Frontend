import { Component, OnInit } from "@angular/core";
import { GameService } from "../shared/game.service";
import { GameModel } from "../shared/game-model";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styles: []
})
export class GamesComponent implements OnInit {
  constructor(private service: GameService) {}

  games: GameModel[];
  searchQuery: string;
  ngOnInit() {
    if (localStorage.getItem("searchQuery") != null)
      this.searchQuery = JSON.parse(localStorage.getItem("searchQuery"));

    if (this.searchQuery == "" || this.searchQuery == undefined) {
      this.service.getGames().subscribe(response => (this.games = response));
    } else {
      this.service
        .getGamesBySearchQuery(this.searchQuery)
        .subscribe(response => (this.games = response));
    }
    localStorage.removeItem("searchQuery");
  }
}
