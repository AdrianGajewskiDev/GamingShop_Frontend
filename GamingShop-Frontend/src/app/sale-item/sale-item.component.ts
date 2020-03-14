import { Component, OnInit, Input } from "@angular/core";
import { SaleModel } from "../shared/Models/sale.model";

@Component({
  selector: "app-sale-item",
  templateUrl: "./sale-item.component.html",
  styleUrls: ["./sale-item.component.css"]
})
export class SaleItemComponent implements OnInit {
  @Input() saleDetails: SaleModel;
  imagePath: string;
  constructor() {}

  ngOnInit() {
    this.imagePath = "../../assets/img/" + this.saleDetails.GameItem.ImageUrl;
  }
}
