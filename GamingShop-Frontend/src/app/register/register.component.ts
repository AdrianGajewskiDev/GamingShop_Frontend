import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { PasswordMisMatch } from "../shared/customValidators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

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
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
      },
      { validators: PasswordMisMatch }
    );
  }
}
