import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/Services/user.service";
import { UserModel } from "src/app/shared/Models/user.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.css"]
})
export class UserAccountComponent implements OnInit {
  userData: UserModel = new UserModel();
  showSaveChangesBtn = false;
  formData: FormGroup;
  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.userData = this.getUserData();
    console.log(this.userData);
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

  goToCart() {
    this.router.navigateByUrl("cart");
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

  goToLatestOrders() {
    this.router.navigateByUrl("latestOrders");
  }

  addGame() {
    this.router.navigateByUrl("/addGame");
  }

  goToMySales() {
    this.router.navigateByUrl("/mySales");
  }
}
