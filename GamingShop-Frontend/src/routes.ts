import { Routes } from "@angular/router";
import { GamesComponent } from "./app/games/games.component";
import { UserAccountComponent } from "./app/user/user/user-account.component";
import { GameDetailsComponent } from "./app/game-details/game-details.component";
import { LoginComponent } from "./app/login/login.component";
import { RegisterComponent } from "./app/register/register.component";

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
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
];
