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

  ngOnInit() {
    this.service.getGames().subscribe(response => (this.games = response));
  }
}
