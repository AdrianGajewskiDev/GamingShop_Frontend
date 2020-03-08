import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class ImageUploader {
  private URL: string = "http://localhost:55367/api";

  constructor(private http: HttpClient) {}

  uploadImage(image: File) {
    let input = new FormData();
    input.append("image", image);

    return this.http.post(this.URL + "/Sales/AddImage", input);
  }
}
