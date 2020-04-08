import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Messages } from "../Models/messages.model";
import { NewMessage } from "../Models/newMessage.model";

@Injectable()
export class MessageService {
  private baseURL = "https://localhost:44313/api/Message";

  constructor(private client: HttpClient) {}

  getUserMessages(userID: string): Observable<Messages> {
    return this.client.get<Messages>(this.baseURL + "/GetMessages");
  }

  sendMessage(model: NewMessage) {
    return this.client.post(this.baseURL + "/SendMessage", model);
  }
}
