import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../shared/user.service";
@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"]
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private service: UserService) {}
  formGroup: FormGroup;
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      Email: ["", Validators.required]
    });
  }

  onSubmit() {
    this.service
      .forgetPassword(this.formGroup.get("Email").value)
      .subscribe(res => console.log(res));
  }
}
