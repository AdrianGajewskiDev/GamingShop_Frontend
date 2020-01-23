import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

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

import { GameService } from "./shared/game.service";
import { UserService } from "./shared/user.service";
import { AuthorizationInterceptor } from "./shared/authorization.interceptor";

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    GameService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
