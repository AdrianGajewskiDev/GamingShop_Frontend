import { FormGroup, ValidatorFn, ValidationErrors } from "@angular/forms";

export const PasswordMisMatch: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("Password");
  const confirmPassword = control.get("ConfirmPassword");

  if (password.value != confirmPassword.value)
    return { passwordMisMatch: true };
  else return null;
};
