import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GameModel } from "../Models/game-model";
import { NewGameModel } from "../Models/newGame.model";
import { GameIndexModel } from "../Models/game-index-model";
@Injectable()
export class GameService {
  constructor(private http: HttpClient) {}

  URL = "http://localhost:55367/api";
  getGames() {
    return this.http.get<GameIndexModel[]>(this.URL + "/Games/GetAll");
  }

  getGamesBySearchQuery(query: string) {
    return this.http.get<GameModel[]>(this.URL + "/Games/Search/" + query);
  }

  getGameByID(id: number) {
    return this.http.get<GameModel>(this.URL + "/Games/GetGame/" + id);
  }

  addGame(model: NewGameModel) {
    return this.http.post(this.URL + "/Sales/AddGame", model);
  }

  deleteGame(gameID: number) {
    return this.http.delete(this.URL + "/Games/DeleteGame/" + gameID);
  }

  updateGame(model: GameModel, gameID: number) {
    return this.http.put(this.URL + "/Games/UpdateGame/" + gameID, model);
  }
}
