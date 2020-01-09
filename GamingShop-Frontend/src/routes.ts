import { Routes } from "@angular/router";
import { GamesComponent } from "./app/games/games.component";
import { UserAccountComponent } from "./app/user/user/user-account.component";

export const appRoutes: Routes = [
  {
    path: "games",
    component: GamesComponent
  },
  {
    path: "user",
    component: UserAccountComponent
  },
  {
    path: "",
    component: GamesComponent
  }
];
