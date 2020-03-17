import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewGameModel } from "../shared/Models/newGame.model";
import { GameService } from "../shared/Services/game.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ImageUploader } from "../shared/HelperClasses/imageUploader";
import { GameModel } from "../shared/Models/game-model";

@Component({
  selector: "app-add-game",
  templateUrl: "./add-game.component.html",
  styleUrls: ["./add-game.component.css"]
})
export class AddGameComponent implements OnInit {
  image: File;
  newGameForm: FormGroup;
  newGameModel: NewGameModel = new NewGameModel();
  returnedGameID;

  constructor(
    private fb: FormBuilder,
    private service: GameService,
    private router: Router,
    private imgUploader: ImageUploader,
    private routes: ActivatedRoute
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
      Platform: ["", Validators.required]
    });
  }

  onSubmit() {
    this.newGameModel.Title = this.newGameForm.get("Title").value;
    this.newGameModel.Description = this.newGameForm.get("Description").value;
    this.newGameModel.Producent = this.newGameForm.get("Producent").value;
    this.newGameModel.Pegi = this.newGameForm.get("Pegi").value;
    this.newGameModel.LaunchDate = this.newGameForm.get("LaunchDate").value;
    this.newGameModel.Type = this.newGameForm.get("Type").value;
    this.newGameModel.Platform = this.newGameForm.get("Platform").value;
    this.newGameModel.Price = this.newGameForm.get("Price").value;
    this.newGameModel.ImageUrl = this.image.name;
    this.service.addGame(this.newGameModel).subscribe(
      res => {
        this.imgUploader.uploadImage(this.image, res).subscribe(
          res => {
            this.router.navigateByUrl("/games");
          },
          error => console.log(error)
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  onUploadImageChange(event) {
    this.image = event.target.files[0];
  }
}
