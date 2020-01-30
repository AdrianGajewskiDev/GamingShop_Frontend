import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../shared/cart.service";

@Component({
  selector: "app-game-item",
  templateUrl: "./game-item.component.html",
  styleUrls: ["./game-item.component.css"]
})
export class GameItemComponent implements OnInit {
  @Input() gameDetails;

  constructor(private router: Router, private service: CartService) {}

  ngOnInit() {}

  goToDetails(id: number): void {
    this.router.navigate(["details", id]);
  }

  addToCart() {
    this.service
      .addToCart(this.gameDetails.ID)
      .subscribe(res => console.log("OK"));
  }
}
