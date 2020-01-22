import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

import { UserLoginModel } from "../shared/user-login.model";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  loginForm: FormGroup;
  showError: boolean;

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    var model: UserLoginModel = {
      Username: this.loginForm.get("username").value,
      Password: this.loginForm.get("password").value
    };

    this.service.login(model).subscribe(
      (res: any) => {
        this.showError = false;
        localStorage.setItem("token", res.token);
        this.router.navigateByUrl("/games");
      },
      error => {
        if (error.status == "400") this.showError = true;
      }
    );
  }
}
