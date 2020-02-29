import { Routes } from "@angular/router";
import { GamesComponent } from "./app/games/games.component";
import { UserAccountComponent } from "./app/user/user/user-account.component";
import { GameDetailsComponent } from "./app/game-details/game-details.component";
import { LoginComponent } from "./app/login/login.component";
import { RegisterComponent } from "./app/register/register.component";
import { AuthenticationGuard } from "./app/shared/authentication.guard";
import { EmailConfirmationComponent } from "./app/email-confirmation/email-confirmation.component";
import { CartComponent } from "./app/cart/cart.component";
import { OrderComponent } from "./app/order/order.component";
import { LatestOrdersComponent } from "./app/latest-orders/latest-orders.component";
import { ForgetPasswordComponent } from "./app/forget-password/forget-password.component";
import { ForgetPasswordNewComponent } from "./app/forget-password-new/forget-password-new.component";

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
    component: LatestOrdersComponent
  },
  {
    path: "forgetPassword",
    component: ForgetPasswordComponent
  },
  {
    path: "resetPassword/:userID/:token",
    component: ForgetPasswordNewComponent
  }
];
