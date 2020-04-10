import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PasswordMisMatch } from "../../shared/HelperClasses/customValidators";
import { NewPasswordModel } from "../../shared/Models/newPassword.mode";
import { UserService } from "../../shared/Services/user.service";

@Component({
  selector: "app-forget-password-new",
  templateUrl: "./forget-password-new.component.html",
  styleUrls: ["./forget-password-new.component.css"],
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
  submit = false;
  form: FormGroup;
  model: NewPasswordModel = new NewPasswordModel();

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userID = params["userID"];
      this.token = params["token"];
    });

    this.form = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: PasswordMisMatch }
    );
  }

  onSubmit() {
    this.submit = true;
    this.model.JWTToken = this.token;
    this.model.UserID = this.userID;
    this.model.Password = this.form.get("password").value;

    this.userService.forgetPasswordCallback(this.model).subscribe(
      (res: any) => {
        this.router.navigateByUrl("login");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
