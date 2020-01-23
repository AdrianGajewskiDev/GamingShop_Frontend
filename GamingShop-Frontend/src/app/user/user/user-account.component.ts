import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/user.service";
import { UserModel } from "src/app/shared/user.model";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styles: []
})
export class UserAccountComponent implements OnInit {
  userData: UserModel = new UserModel();

  constructor(private service: UserService) {}

  ngOnInit() {
    this.userData = this.getUserData();

    console.log(this.userData);
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
          (data.PhoneNumber = res.PhoneNumber)
        )
      );
    return data;
  }
}
