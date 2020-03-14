import { Component, OnInit, Input } from "@angular/core";
import { LatestOrderModel } from "../shared/Models/latest-order.model";
import { Router } from "@angular/router";
import { GUID } from "../shared/HelperClasses/GUID";

@Component({
  selector: "app-latest-order-item",
  templateUrl: "./latest-order-item.component.html",
  styleUrls: ["./latest-order-item.component.css"]
})
export class LatestOrderItemComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() orderDetails: LatestOrderModel;
  itemID = GUID.newGuid();
  ngOnInit() {}

  showOrderItems() {
    let items = document.getElementById(this.itemID.toString());

    items.classList.toggle("active");
  }
  goToGameDetails(gameID: number) {
    this.router.navigateByUrl("details/" + gameID);
  }
}
