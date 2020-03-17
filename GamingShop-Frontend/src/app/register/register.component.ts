import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { PasswordMisMatch } from "../shared/HelperClasses/customValidators";
import { UserService } from "../shared/Services/user.service";
import { UserModel } from "../shared/Models/user.model";
import { Router } from "@angular/router";
import { UserLoginModel } from "../shared/Models/user-login.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  @Input() passwordMisMatch;

  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        email: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
          ]
        ],
        username: ["", [Validators.required]],
        phoneNumber: ["", [Validators.required, Validators.minLength(9)]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
      },
      { validators: PasswordMisMatch }
    );
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onSubmit() {
    var model: UserModel = {
      UserName: this.registerForm.get("username").value,
      Email: this.registerForm.get("email").value,
      Password: this.registerForm.get("password").value,
      PhoneNumber: this.registerForm.get("phoneNumber").value
    };
    this.service.registerUser(model).subscribe();

    var userLoginModel: UserLoginModel = {
      Username: model.UserName,
      Password: model.Password
    };

    await this.delay(2000);
    //if user successfully created then login him
    this.service.login(userLoginModel).subscribe((res: any) => {
      localStorage.setItem("token", res.token);
      this.service.isUserLoggedIn = true;
    });

    this.router.navigateByUrl("/games");
  }
}
