import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { OrderModel } from "./order.model";
import { LatestOrderModel } from "./latest-order.model";

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}
  URL = "http://localhost:55367/api";
  placeOrder(cartID: number, model: OrderModel) {
    return this.http.put(this.URL + "/Order/PlaceOrder/" + cartID, model);
  }

  getLatestOrders() {
    return this.http.get<LatestOrderModel[]>(this.URL + "/Order/latestOrders");
  }
}
