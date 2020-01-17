import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GameModel } from "./game-model";
@Injectable()
export class GameService {
  constructor(private http: HttpClient) {}

  URL = "http://localhost:55367/api";

  getGames() {
    return this.http.get<GameModel[]>(this.URL + "/Games/GetAll");
  }
}
