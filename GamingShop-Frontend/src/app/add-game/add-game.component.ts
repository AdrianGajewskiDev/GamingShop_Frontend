import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewGameModel } from "../shared/newGame.model";
import { GameService } from "../shared/game.service";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { ImageUploader } from "../shared/imageUploader";

@Component({
  selector: "app-add-game",
  templateUrl: "./add-game.component.html",
  styleUrls: ["./add-game.component.css"]
})
export class AddGameComponent implements OnInit {
  image: File;
  newGameForm: FormGroup;
  newGameModel: NewGameModel = new NewGameModel();

  constructor(
    private fb: FormBuilder,
    private service: GameService,
    private router: Router,
    private imgUploader: ImageUploader
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
        console.log("Succeeded!!!!");
      },
      error => {
        console.log(error);
      }
    );

    this.imgUploader.uploadImage(this.image).subscribe(
      res => {
        console.log("Succeeded");
      },
      error => console.log(error)
    );
  }

  onUploadImageChange(event) {
    this.image = event.target.files[0];
  }
}
