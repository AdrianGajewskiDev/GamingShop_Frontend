import { Component, OnInit } from "@angular/core";
import { GameModel } from "../../shared/Models/game-model";
import { GameService } from "../../shared/Services/game.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormsMapper } from "src/app/shared/HelperClasses/formsMapper";

@Component({
  selector: "app-update-game",
  templateUrl: "./update-game.component.html",
  styleUrls: ["./update-game.component.css"],
})
export class UpdateGameComponent implements OnInit {
  gameDetailsModel: GameModel = new GameModel();
  updatedGameModel: GameModel = new GameModel();
  gameID: number;
  formGroup: FormGroup;

  constructor(
    private gameService: GameService,
    private routes: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router,
    private mapper: FormsMapper
  ) {
    this.routes.params.subscribe((param) => {
      this.gameID = param["gameID"];
    });
  }

  ngOnInit() {
    this.gameService.getGameByID(this.gameID).subscribe(
      (res: GameModel) => {
        this.formGroup.patchValue(res);
      },
      (error) => console.log(error)
    );

    this.formGroup = this.builder.group({
      Title: ["", Validators.required],
      Description: ["", Validators.required],
      Producent: ["", Validators.required],
      Price: ["", Validators.required],
      Pegi: ["", Validators.required],
      LaunchDate: ["", Validators.required],
      Type: ["", Validators.required],
      Platform: ["", Validators.required],
    });
  }

  onSubmit() {
    this.updatedGameModel = this.buildModel(this.formGroup);
    this.gameService.updateGame(this.updatedGameModel, this.gameID).subscribe(
      (res) => {
        this.router.navigateByUrl("mySales");
      },
      (error) => console.log(error)
    );
  }

  buildModel(form: FormGroup): GameModel {
    let model = this.mapper.map<GameModel>(new GameModel(), this.formGroup);
    model.ID = this.gameID;

    return model;
  }
}
