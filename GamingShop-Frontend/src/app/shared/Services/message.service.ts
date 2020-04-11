import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Messages } from "../Models/messages.model";
import { NewMessage } from "../Models/newMessage.model";
import { Message } from "../Models/message.model";

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

  sendMessageMSG(model: Message) {
    return this.client.post(this.baseURL + "/SendMessage", model);
  }

  getMessageDetails(msgID: number): Observable<Message> {
    return this.client.get<Message>(this.baseURL + "/ByID/" + msgID);
  }
}
