import { GameModel } from "./game-model";

export interface LatestOrderModel {
  Placed: string;
  TotalPrice: number;
  Street: string;
  City: string;
  Country: string;
  Games: GameModel[];
}
