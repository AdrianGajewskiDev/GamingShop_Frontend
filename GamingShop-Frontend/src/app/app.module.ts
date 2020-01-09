import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { appRoutes } from "../routes";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { GamesComponent } from "./games/games.component";
import { UserAccountComponent } from "./user/user/user-account.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GamesComponent,
    UserAccountComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
