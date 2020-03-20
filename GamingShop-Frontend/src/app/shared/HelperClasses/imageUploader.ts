import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ImageUploader {
  private URL: string = "http://localhost:55367/api";

  constructor(private http: HttpClient) {}

  uploadGameImage(image: File, id) {
    let input = new FormData();
    input.append("image", image);

    return this.http.post(this.URL + "/Sales/AddGameImage/" + id, input);
  }

  uploadUserProfileImage(image: File, id) {
    let input = new FormData();
    input.append("image", image);

    return this.http.post(this.URL + "/Sales/AddUserProfileImage", input);
  }
}
