import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/user.service";
import { UserModel } from "src/app/shared/user.model";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.css"]
})
export class UserAccountComponent implements OnInit {
  userData: UserModel = new UserModel();
  showSaveChangesBtn = false;
  formData: FormGroup;
  constructor(private service: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.userData = this.getUserData();

    this.formData = this.fb.group({
      Username: [""],
      Email: [""],
      PhoneNumber: [""]
    });
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
          (data.UserName = res.UserName),
          (data.Email = res.Email),
          (data.Password = res.Password),
          (data.PhoneNumber = res.PhoneNumber),
          (data.EmailConfirmed = res.EmailConfirmed)
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

  saveChanges() {
    console.log("here");
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
}
