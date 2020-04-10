import { Component, OnInit } from "@angular/core";
import { LatestOrderModel } from "../../shared/Models/latest-order.model";
import { OrderService } from "../../shared/Services/order.service";

@Component({
  selector: "app-latest-orders",
  templateUrl: "./latest-orders.component.html",
  styleUrls: ["./latest-orders.component.css"],
})
export class LatestOrdersComponent implements OnInit {
  constructor(private service: OrderService) {}

  orders: LatestOrderModel[] = [];

  ngOnInit() {
    this.service.getLatestOrders().subscribe((res) => {
      res.forEach((element) => {
        this.orders.push(element);
        console.log(element.Games);
      });
    });
  }
}
