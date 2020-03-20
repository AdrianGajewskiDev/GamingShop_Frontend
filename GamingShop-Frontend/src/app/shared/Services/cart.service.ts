import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GameModel } from "../Models/game-model";

@Injectable()
export class CartService {
  constructor(private http: HttpClient) {}
  URL = "http://localhost:55367/api";
  addToCart(gameID: number) {
    return this.http.post(this.URL + "/Cart/AddItemToCart/" + gameID, null);
  }

  getAllByCart() {
    return this.http.get<GameModel[]>(this.URL + "/Cart/GetItemsInCart");
  }

  removeFromCart(id: number) {
    return this.http.post(this.URL + "/Cart/RemoveFromCart", id);
  }

  async getCardID(): Promise<number> {
    const response = await this.http
      .get<number>(this.URL + "/Cart/GetCardID")
      .toPromise();
    return response;
  }
}
