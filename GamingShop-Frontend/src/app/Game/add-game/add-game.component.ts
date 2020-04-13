import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewGameModel } from "../../shared/Models/newGame.model";
import { GameService } from "../../shared/Services/game.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ImageUploader } from "../../shared/HelperClasses/imageUploader";
import { GameModel } from "../../shared/Models/game-model";
import { gameTypes } from "../../shared/Models/game-types";
import { platforms } from "src/app/shared/Models/platforms";
import { FormsMapper } from "src/app/shared/HelperClasses/formsMapper";

@Component({
  selector: "app-add-game",
  templateUrl: "./add-game.component.html",
  styleUrls: ["./add-game.component.css"],
})
export class AddGameComponent implements OnInit {
  image: File;
  newGameForm: FormGroup;
  newGameModel: NewGameModel = new NewGameModel();
  returnedGameID;
  submited = false;
  types: string[] = gameTypes;
  platforms: string[] = platforms;

  constructor(
    private fb: FormBuilder,
    private service: GameService,
    private router: Router,
    private imgUploader: ImageUploader,
    private routes: ActivatedRoute,
    private mapper: FormsMapper
  ) {}

  ngOnInit() {
    this.newGameForm = this.fb.group({
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
    this.submited = true;

    this.newGameModel = this.mapper.map<NewGameModel>(
      this.newGameModel,
      this.newGameForm
    );

    this.newGameModel.ImageUrl = this.image.name;

    this.service.addGame(this.newGameModel).subscribe(
      (res) => {
        this.imgUploader.uploadGameImage(this.image, res).subscribe(
          (res) => {
            this.router.navigateByUrl("/games");
          },
          (error) => console.log(error)
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUploadImageChange(event) {
    this.image = event.target.files[0];
  }

  changeType(e) {
    this.newGameForm.get("Type").setValue(e.target.value);
  }
  changePlatform(e) {
    this.newGameForm.get("Platform").setValue(e.target.value);
  }
}
