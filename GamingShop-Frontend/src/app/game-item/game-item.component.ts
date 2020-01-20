import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-game-item",
  templateUrl: "./game-item.component.html",
  styleUrls: ["./game-item.component.css"]
})
export class GameItemComponent implements OnInit {
  @Input() gameDetails;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToDetails(id: number): void {
    this.router.navigate(["details", id]);
  }
}
