import { Component, OnInit } from "@angular/core";
import { CartService } from "../shared/cart.service";
import { GameModel } from "../shared/game-model";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  constructor(private service: CartService, private router: Router) {}

  cartItems: GameModel[];

  ngOnInit() {
    this.cartItems = this.getGames();
    console.log(this.cartItems);
  }

  getGames(): GameModel[] {
    let data: GameModel[] = new Array<GameModel>();

    this.service.getAllByCart().subscribe(res =>
      res.forEach(element => {
        data.push(element);
      })
    );
    return data;
  }
  goToGameDetails(id: number) {
    this.router.navigateByUrl("details/" + id);
  }
}
