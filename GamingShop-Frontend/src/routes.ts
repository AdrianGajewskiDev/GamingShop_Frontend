import { Routes } from "@angular/router";
import { GamesComponent } from "./app/games/games.component";
import { UserAccountComponent } from "./app/user/user/user-account.component";
import { GameDetailsComponent } from "./app/game-details/game-details.component";
import { LoginComponent } from "./app/login/login.component";
import { RegisterComponent } from "./app/register/register.component";
import { AuthenticationGuard } from "./app/shared/Authentication/authentication.guard";
import { EmailConfirmationComponent } from "./app/email-confirmation/email-confirmation.component";
import { CartComponent } from "./app/cart/cart.component";
import { OrderComponent } from "./app/order/order.component";
import { LatestOrdersComponent } from "./app/latest-orders/latest-orders.component";
import { ForgetPasswordComponent } from "./app/forget-password/forget-password.component";
import { ForgetPasswordNewComponent } from "./app/forget-password-new/forget-password-new.component";
import { AddGameComponent } from "./app/add-game/add-game.component";
import { UserSalesComponent } from "./app/user-sales/user-sales.component";
import { UpdateGameComponent } from "./app/update-game/update-game.component";
import { NotFoundComponent } from "./app/not-found/not-found.component";

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
    component: UserAccountComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "EmailConfirmation",
    component: EmailConfirmationComponent
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "order/:cartID",
    component: OrderComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "latestOrders",
    component: LatestOrdersComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "forgetPassword",
    component: ForgetPasswordComponent
  },
  {
    path: "resetPassword/:userID/:token",
    component: ForgetPasswordNewComponent
  },
  {
    path: "addGame",
    component: AddGameComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "mySales",
    component: UserSalesComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "update-game/:gameID",
    component: UpdateGameComponent,
    canActivate: [AuthenticationGuard]
  }
];
