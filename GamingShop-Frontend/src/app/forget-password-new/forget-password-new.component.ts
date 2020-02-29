import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PasswordMisMatch } from "../shared/customValidators";
import { NewPasswordModel } from "../shared/newPassword.mode";
import { UserService } from "../shared/user.service";

@Component({
  selector: "app-forget-password-new",
  templateUrl: "./forget-password-new.component.html",
  styleUrls: ["./forget-password-new.component.css"]
})
export class ForgetPasswordNewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  userID: string;
  token: string;
  confirmationToken: string;

  form: FormGroup;
  model: NewPasswordModel = new NewPasswordModel();

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userID = params["userID"];
      this.token = params["token"];
    });

    this.form = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required]]
      },
      { validators: PasswordMisMatch }
    );
  }

  onSubmit() {
    this.model.JWTToken = this.token;
    this.model.UserID = this.userID;
    this.model.Password = this.form.get("password").value;

    console.log(this.model);

    this.userService.forgetPasswordCallback(this.model).subscribe(
      (res: any) => {
        this.router.navigateByUrl("login");
      },
      error => {
        console.log(error);
      }
    );
  }
}
