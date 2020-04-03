import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/Services/user.service";
import { UserModel } from "src/app/shared/Models/user.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ImageUploader } from "../../shared/HelperClasses/imageUploader";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.css"]
})
export class UserAccountComponent implements OnInit {
  userData: UserModel = new UserModel();
  showSaveChangesBtn = false;
  formData: FormGroup;
  file: File;
  imagePath;

  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private router: Router,
    private imageService: ImageUploader
  ) {}

  ngOnInit() {
    this.userData = this.getUserData();

    this.formData = this.fb.group({
      Username: [""],
      Email: [""],
      PhoneNumber: [""]
    });

    console.log(this.imagePath);
  }

  toggleBtn() {
    this.showSaveChangesBtn = true;
  }

  getUserData(): UserModel {
    let data: UserModel = new UserModel();

    this.service
      .getUserProfile()
      .subscribe(
        res => (
          (data.ID = res.ID),
          (data.UserName = res.UserName),
          (data.Email = res.Email),
          (data.Password = res.Password),
          (data.PhoneNumber = res.PhoneNumber),
          (data.EmailConfirmed = res.EmailConfirmed),
          (this.imagePath = "../../../assets/img/" + res.ImageUrl),
          (data.ImageUrl = res.ImageUrl)
        )
      );

    return data;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onBlurMethod() {
    await this.delay(100);
    this.showSaveChangesBtn = false;
  }

  goToCart() {
    this.router.navigateByUrl("cart");
  }

  saveChanges() {
    let data_Username = this.formData.get("Username").value;
    let data_Email = this.formData.get("Email").value;
    let data_PhoneNumber = this.formData.get("PhoneNumber").value;

    if (data_Username != "" && this.userData.UserName != data_Username) {
      this.service.updateUsername(data_Username).subscribe(res => {
        window.location.reload();
      });
    }

    if (data_Email != "" && this.userData.Email != data_Email) {
      this.service.updateEmail(data_Email).subscribe(res => {
        window.location.reload();
      });
    }

    if (
      data_PhoneNumber != "" &&
      this.userData.PhoneNumber != data_PhoneNumber
    ) {
      this.service.updatePhoneNumber(data_PhoneNumber).subscribe(res => {
        window.location.reload();
      });
    }
  }

  goToLatestOrders() {
    this.router.navigateByUrl("latestOrders");
  }

  addGame() {
    this.router.navigateByUrl("/addGame");
  }

  goToMySales() {
    this.router.navigateByUrl("/mySales");
  }

  onUploadImageChange(event) {
    this.file = event.target.files[0];

    return this.imageService
      .uploadUserProfileImage(this.file, this.userData.ID)
      .subscribe(
        res => {
          console.log("Succeeded!!!!!");
        },
        error => console.log(error)
      );
  }
}
