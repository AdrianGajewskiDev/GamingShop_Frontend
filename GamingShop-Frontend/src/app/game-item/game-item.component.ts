import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-game-item",
  templateUrl: "./game-item.component.html",
  styleUrls: ["./game-item.component.css"]
})
export class GameItemComponent implements OnInit {
  @Input() gameDetails;

  constructor() {}

  ngOnInit() {}
}
