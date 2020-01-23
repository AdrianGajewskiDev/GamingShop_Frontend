import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { PasswordMisMatch } from "../shared/customValidators";
import { UserService } from "../shared/user.service";
import { UserModel } from "../shared/user.model";
import { PathLocationStrategy } from "@angular/common";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: UserService) {}

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

  onSubmit(): void {
    var model: UserModel = {
      UserName: this.registerForm.get("username").value,
      Email: this.registerForm.get("email").value,
      Password: this.registerForm.get("password").value,
      PhoneNumber: this.registerForm.get("phoneNumber").value
    };
    this.service.registerUser(model).subscribe();
  }
}
