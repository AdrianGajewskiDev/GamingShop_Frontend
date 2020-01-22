import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { UserLoginModel } from "./user-login.model";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  readonly URL = "http://localhost:55367/api";
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
}
