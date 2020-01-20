import { Routes } from "@angular/router";
import { GamesComponent } from "./app/games/games.component";
import { UserAccountComponent } from "./app/user/user/user-account.component";
import { GameDetailsComponent } from "./app/game-details/game-details.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: GamesComponent
  },
  {
    path: "games",
    component: GamesComponent
  },
  {
    path: "details/:id",
    component: GameDetailsComponent
  },
  {
    path: "user",
    component: UserAccountComponent
  }
];
