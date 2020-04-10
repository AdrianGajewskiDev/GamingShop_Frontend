import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GameModel } from "../../shared/Models/game-model";
import { GameService } from "../../shared/Services/game.service";
import { CartService } from "../../shared/Services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-game-details",
  templateUrl: "./game-details.component.html",
  styleUrls: ["./game-details.component.css"],
})
export class GameDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  game: GameModel = new GameModel();
  id: number;
  seller_Username = "";
  imagePath: string;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });

    this.game = this.getGameDetails();
    console.log(this.id);
  }

  getGameDetails(): GameModel {
    let data: GameModel = new GameModel();

    this.gameService
      .getGameByID(this.id)
      .subscribe(
        (res) => (
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
          (data.LaunchDate = res.LaunchDate),
          (data.Sold = res.Sold)
        )
      );

    return data;
  }

  addToCart() {
    this.cartService.addToCart(this.id).subscribe(
      (res) => {
        this.toastr.info("Your item has been added to your cart");
      },
      (error) => console.log(error)
    );
  }

  sendMessage() {
    this.router.navigateByUrl("sendMessage/" + this.id);
  }
}
