import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

import { PasswordMisMatch } from "../../shared/HelperClasses/customValidators";
import { UserService } from "../../shared/Services/user.service";
import { UserModel } from "../../shared/Models/user.model";
import { Router } from "@angular/router";
import { UserLoginModel } from "../../shared/Models/user-login.model";
import { ToastrService } from "ngx-toastr";
import { FormsMapper } from "src/app/shared/HelperClasses/formsMapper";
import { RegisterModel } from "src/app/shared/Models/register.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toastr: ToastrService,
    private mapper: FormsMapper
  ) {}

  @Input() passwordMisMatch;

  submited = false;
  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        Email: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          ],
        ],
        UserName: ["", [Validators.required]],
        PhoneNumber: ["", [Validators.required, Validators.minLength(9)]],
        Password: ["", [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: ["", [Validators.required, Validators.minLength(8)]],
      },
      { validators: PasswordMisMatch }
    );
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async onSubmit() {
    this.submited = true;

    var model: RegisterModel = this.mapper.map<RegisterModel>(
      new RegisterModel(),
      this.registerForm
    );

    console.log(model);

    this.service.registerUser(model).subscribe(
      (res) => {
        this.router.navigateByUrl("/login");
        localStorage.setItem("registration", "Success");
      },
      (error) => {
        this.submited = false;
        this.toastr.error("Registration Failed!!! Please try again");
      }
    );
  }
}
