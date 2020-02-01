import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrderModel } from "./order.model";

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}
  URL = "http://localhost:55367/api";
  placeOrder(cartID: number, model: OrderModel) {
    return this.http.put(this.URL + "/Order/PlaceOrder", model);
  }
}
