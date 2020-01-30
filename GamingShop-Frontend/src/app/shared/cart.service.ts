import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GameModel } from "./game-model";

@Injectable()
export class CartService {
  constructor(private http: HttpClient) {}
  URL = "http://localhost:55367/api";
  addToCart(gameID: number) {
    return this.http.post(this.URL + "/Cart/AddItemToCart", gameID);
  }

  getAllByCart() {
    return this.http.get<GameModel[]>(this.URL + "/Cart/GetItemsInCart");
  }
}
