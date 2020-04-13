import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "../../node_modules/ngx-toastr";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./App-related/navbar/navbar.component";
import { GamesComponent } from "./Game/games/games.component";
import { UserAccountComponent } from "./user/user/user-account.component";
import { GameItemComponent } from "./Game/game-item/game-item.component";
import { GameDetailsComponent } from "./Game/game-details/game-details.component";
import { FooterComponent } from "./App-related/footer/footer.component";
import { LoginComponent } from "./UserProfile/login/login.component";
import { RegisterComponent } from "./UserProfile/register/register.component";

import { appRoutes } from "../routes";

import { GameService } from "./shared/Services/game.service";
import { UserService } from "./shared/Services/user.service";
import { CartService } from "./shared/Services/cart.service";
import { OrderService } from "./shared/Services/order.service";
import { AuthorizationInterceptor } from "./shared/Authentication/authorization.interceptor";
import { EmailConfirmationComponent } from "./UserProfile/email-confirmation/email-confirmation.component";
import { CartComponent } from "./UserProfile/cart/cart.component";
import { OrderComponent } from "./Orders/order/order.component";
import { LatestOrdersComponent } from "./Orders/latest-orders/latest-orders.component";
import { LatestOrderItemComponent } from "./Orders/latest-order-item/latest-order-item.component";
import { ForgetPasswordComponent } from "./UserProfile/forget-password/forget-password.component";
import { ForgetPasswordNewComponent } from "./UserProfile/forget-password-new/forget-password-new.component";
import { AddGameComponent } from "./Game/add-game/add-game.component";
import { ImageUploader } from "./shared/HelperClasses/imageUploader";
import { UserSalesComponent } from "./UserProfile/user-sales/user-sales.component";
import { SaleItemComponent } from "./UserProfile/sale-item/sale-item.component";
import { UpdateGameComponent } from "./Game/update-game/update-game.component";
import { LoadingSpinnerComponent } from "./App-related/loading-spinner/loading-spinner.component";
import { NotFoundComponent } from "./App-related/not-found/not-found.component";
import { MessageService } from "./shared/Services/message.service";
import { MessagesComponent } from "./Msg/messages/messages.component";
import { MessageComponent } from "./Msg/message/message.component";
import { MessageDetailsComponent } from "./Msg/message-details/message-details.component";
import { FormsMapper } from "./shared/HelperClasses/formsMapper";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GamesComponent,
    UserAccountComponent,
    GameItemComponent,
    GameDetailsComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    EmailConfirmationComponent,
    CartComponent,
    OrderComponent,
    LatestOrdersComponent,
    LatestOrderItemComponent,
    ForgetPasswordComponent,
    ForgetPasswordNewComponent,
    AddGameComponent,
    UserSalesComponent,
    SaleItemComponent,
    UpdateGameComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
    MessagesComponent,
    MessageComponent,
    MessageDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    GameService,
    UserService,
    CartService,
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    ImageUploader,
    MessageService,
    FormsMapper,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
