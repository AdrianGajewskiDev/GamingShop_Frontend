import { Component, OnInit, Input } from "@angular/core";
import { LatestOrderModel } from "../shared/latest-order.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-latest-order-item",
  templateUrl: "./latest-order-item.component.html",
  styleUrls: ["./latest-order-item.component.css"]
})
export class LatestOrderItemComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() orderDetails: LatestOrderModel;

  ngOnInit() {
    console.log(this.orderDetails);
  }
  showGameDetails: boolean;
  showOrderItems() {
    this.showGameDetails != this.showGameDetails;
  }

  goToGameDetails(gameID: number) {
    this.router.navigateByUrl("details/" + gameID);
  }
}
