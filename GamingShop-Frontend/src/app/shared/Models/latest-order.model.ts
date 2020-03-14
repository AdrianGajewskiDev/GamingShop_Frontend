import { GameModel } from "./game-model";

export interface LatestOrderModel {
  Placed: string;
  Price: number;
  Street: string;
  City: string;
  Country: string;
  Games: GameModel[];
}
