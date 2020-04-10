import { Routes } from "@angular/router";
import { GamesComponent } from "./app/Game/games/games.component";
import { UserAccountComponent } from "./app/user/user/user-account.component";
import { GameDetailsComponent } from "./app/Game/game-details/game-details.component";
import { LoginComponent } from "./app/UserProfile/login/login.component";
import { RegisterComponent } from "./app/UserProfile/register/register.component";
import { AuthenticationGuard } from "./app/shared/Authentication/authentication.guard";
import { EmailConfirmationComponent } from "./app/UserProfile/email-confirmation/email-confirmation.component";
import { CartComponent } from "./app/UserProfile/cart/cart.component";
import { OrderComponent } from "./app/Orders/order/order.component";
import { LatestOrdersComponent } from "./app/Orders/latest-orders/latest-orders.component";
import { ForgetPasswordComponent } from "./app/UserProfile/forget-password/forget-password.component";
import { ForgetPasswordNewComponent } from "./app/UserProfile/forget-password-new/forget-password-new.component";
import { AddGameComponent } from "./app/Game/add-game/add-game.component";
import { UserSalesComponent } from "./app/UserProfile/user-sales/user-sales.component";
import { UpdateGameComponent } from "./app/Game/update-game/update-game.component";
import { NotFoundComponent } from "./app/App-related/not-found/not-found.component";
import { MessagesComponent } from "./app/Msg/messages/messages.component";
import { MessageComponent } from "./app/Msg/message/message.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: GamesComponent,
  },
  {
    path: "games",
    component: GamesComponent,
  },
  {
    path: "details/:id",
    component: GameDetailsComponent,
  },
  {
    path: "user",
    component: UserAccountComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "EmailConfirmation",
    component: EmailConfirmationComponent,
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "order/:cartID",
    component: OrderComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "latestOrders",
    component: LatestOrdersComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "forgetPassword",
    component: ForgetPasswordComponent,
  },
  {
    path: "resetPassword/:userID/:token",
    component: ForgetPasswordNewComponent,
  },
  {
    path: "addGame",
    component: AddGameComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "mySales",
    component: UserSalesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "update-game/:gameID",
    component: UpdateGameComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "messages",
    component: MessagesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "sendMessage/:gameID",
    component: MessageComponent,
    canActivate: [AuthenticationGuard],
  },
];
