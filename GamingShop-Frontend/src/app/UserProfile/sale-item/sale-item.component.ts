import { Component, OnInit, Input } from "@angular/core";
import { SaleModel } from "../../shared/Models/sale.model";
import { CartService } from "../../shared/Services/cart.service";
import { ToastrService } from "ngx-toastr";
import { GameService } from "../../shared/Services/game.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sale-item",
  templateUrl: "./sale-item.component.html",
  styleUrls: ["./sale-item.component.css"],
})
export class SaleItemComponent implements OnInit {
  @Input() saleDetails: SaleModel;
  imagePath: string;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    this.imagePath = "../../assets/img/" + this.saleDetails.GameItem.ImageUrl;
  }

  addToCart(gameID: number): void {
    this.cartService.addToCart(gameID).subscribe(
      (res: any) => {
        this.toastr.info("Your item has beem added to your cart!");
      },
      (error) => console.log(error)
    );
  }

  deleteGame(gameID: number): void {
    this.gameService.deleteGame(gameID).subscribe((res) => {
      this.toastr.info("Your game has been deleted from our store");
      window.location.reload();
    });
  }

  updateGame(gameID: number): void {
    this.router.navigateByUrl("update-game/" + gameID);
  }
}
