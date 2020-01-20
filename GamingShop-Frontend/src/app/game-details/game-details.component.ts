import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameModel } from "../shared/game-model";
import { GameService } from "../shared/game.service";

@Component({
  selector: "app-game-details",
  templateUrl: "./game-details.component.html",
  styleUrls: ["./game-details.component.css"]
})
export class GameDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  game: GameModel;
  id: number;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    this.gameService.getGameByID(this.id).subscribe(res => (this.game = res));

    console.log(this.game);
  }
}
