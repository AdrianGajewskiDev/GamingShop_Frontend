import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Game Over";

  ///function to logout use when browser tab is closed
  @HostListener("window:beforeunload", ["$event"])
  onClose(event) {
    localStorage.removeItem("token");
  }
}
