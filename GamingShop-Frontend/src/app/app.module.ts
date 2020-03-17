import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "../../node_modules/ngx-toastr";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { GamesComponent } from "./games/games.component";
import { UserAccountComponent } from "./user/user/user-account.component";
import { GameItemComponent } from "./game-item/game-item.component";
import { GameDetailsComponent } from "./game-details/game-details.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

import { appRoutes } from "../routes";

import { GameService } from "./shared/Services/game.service";
import { UserService } from "./shared/Services/user.service";
import { CartService } from "./shared/Services/cart.service";
import { OrderService } from "./shared/Services/order.service";
import { AuthorizationInterceptor } from "./shared/Authentication/authorization.interceptor";
import { EmailConfirmationComponent } from "./email-confirmation/email-confirmation.component";
import { CartComponent } from "./cart/cart.component";
import { OrderComponent } from "./order/order.component";
import { LatestOrdersComponent } from "./latest-orders/latest-orders.component";
import { LatestOrderItemComponent } from "./latest-order-item/latest-order-item.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ForgetPasswordNewComponent } from "./forget-password-new/forget-password-new.component";
import { AddGameComponent } from "./add-game/add-game.component";
import { ImageUploader } from "./shared/HelperClasses/imageUploader";
import { UserSalesComponent } from "./user-sales/user-sales.component";
import { SaleItemComponent } from './sale-item/sale-item.component';
import { UpdateGameComponent } from './update-game/update-game.component';

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
    UpdateGameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    GameService,
    UserService,
    CartService,
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    ImageUploader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
