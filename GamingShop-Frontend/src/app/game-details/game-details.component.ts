import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameModel } from "../shared/game-model";
import { GameService } from "../shared/game.service";
import { UserService } from "../shared/user.service";
import { StringifyOptions } from "querystring";

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
  game: GameModel = new GameModel();
  id: number;
  seller_Username = "";
  imagePath: string;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    this.game = this.getGameDetails();
  }

  getGameDetails(): GameModel {
    let data: GameModel = new GameModel();

    this.gameService
      .getGameByID(this.id)
      .subscribe(
        res => (
          (data.Title = res.Title),
          (data.Description = res.Description),
          (data.ID = res.ID),
          (this.imagePath = "../../assets/img/" + res.ImageUrl),
          (data.OwnerUsername = res.OwnerUsername),
          (data.Pegi = res.Pegi),
          (data.Platform = res.Platform),
          (data.Price = res.Price),
          (data.Producent = res.Producent),
          (data.Type = res.Type),
          (data.LaunchDate = res.LaunchDate)
        )
      );

    return data;
  }
}
