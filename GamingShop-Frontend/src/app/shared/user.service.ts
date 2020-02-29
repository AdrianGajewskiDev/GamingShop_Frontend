import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { UserLoginModel } from "./user-login.model";
import { NewPasswordModel } from "./newPassword.mode";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  readonly URL = "http://localhost:55367/api";
  isUserLoggedIn = localStorage.getItem("token") != null;

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  registerUser(model: UserModel) {
    return this.http.post<UserModel>(this.URL + "/User/register", model);
  }

  login(model: UserLoginModel) {
    return this.http.post<UserLoginModel>(this.URL + "/User/login", model);
  }

  getUserProfile() {
    return this.http.get<UserModel>(this.URL + "/UserProfile");
  }

  updateUsername(username: string) {
    return this.http.post(
      this.URL + "/UserProfile/UpdateUsername/" + username,
      null
    );
  }

  updateEmail(email: string) {
    return this.http.post(this.URL + "/UserProfile/UpdateEmail/" + email, null);
  }

  updatePhoneNumber(phoneNumber: string) {
    return this.http.post(
      this.URL + "/UserProfile/UpdatePhoneNumber/" + phoneNumber,
      null
    );
  }

  forgetPassword(email: string) {
    return this.http.post(this.URL + "/User/ForgetPassword/" + email, null);
  }
  forgetPasswordCallback(model: NewPasswordModel) {
    return this.http.post(this.URL + "/User/ForgetPasswordCallback", model);
  }
}
