import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/Services/user.service";
import { SaleModel } from "../shared/Models/sale.model";

@Component({
  selector: "app-user-sales",
  templateUrl: "./user-sales.component.html",
  styleUrls: ["./user-sales.component.css"]
})
export class UserSalesComponent implements OnInit {
  games: SaleModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.games = this.getUserSales();
  }

  getUserSales(): SaleModel[] {
    let model: SaleModel[] = [];

    this.userService.getUserSales().subscribe(res => {
      res.forEach(element => {
        var sale = new SaleModel();

        sale.Created = element.Created;
        sale.GameItem = element.GameItem;
        sale.Price = element.Price;

        model.push(sale);
      });
    });

    return model;
  }
}
