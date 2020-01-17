import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { appRoutes } from "../routes";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { GamesComponent } from "./games/games.component";
import { UserAccountComponent } from "./user/user/user-account.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { GameService } from "./shared/game.service";
import { GameItemComponent } from './game-item/game-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GamesComponent,
    UserAccountComponent,
    GameItemComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
