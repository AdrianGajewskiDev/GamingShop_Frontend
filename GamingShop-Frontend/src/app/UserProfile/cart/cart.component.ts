import { Component, OnInit } from "@angular/core";
import { CartService } from "../../shared/Services/cart.service";
import { GameModel } from "../../shared/Models/game-model";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  constructor(private service: CartService, private router: Router) {}

  cartItems: GameModel[];
  price: number = 0;
  ngOnInit() {
    this.cartItems = this.getGames();
  }

  getGames(): GameModel[] {
    let data: GameModel[] = new Array<GameModel>();

    this.service.getAllByCart().subscribe((res) =>
      res.forEach((element) => {
        this.price += element.Price;
        data.push(element);
      })
    );
    return data;
  }
  goToGameDetails(id: number) {
    this.router.navigateByUrl("details/" + id);
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async removeItem(ID: number) {
    this.service.removeFromCart(ID).subscribe();
    await this.delay(0.3);
    window.location.reload();
  }

  async placeOrder() {
    var cartID = await this.service.getCardID();

    this.router.navigateByUrl("order/" + cartID);
  }
}
