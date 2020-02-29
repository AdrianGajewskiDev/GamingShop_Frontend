import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../shared/user.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"]
})
export class ForgetPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService
  ) {}
  formGroup: FormGroup;
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      Email: ["", Validators.required]
    });
  }

  onSubmit() {
    this.service.forgetPassword(this.formGroup.get("Email").value).subscribe(
      (res: any) => {
        this.toastr.info(
          "We've send you a password reset link, check your email box"
        );
      },
      error => {
        console.log(error);
      }
    );
  }
}
