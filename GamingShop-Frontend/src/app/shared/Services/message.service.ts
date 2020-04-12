import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Messages } from "../Models/messages.model";
import { NewMessage } from "../Models/newMessage.model";
import { Message } from "../Models/message.model";

@Injectable()
export class MessageService {
  private baseURL = "https://localhost:44313/api/Message";

  constructor(private client: HttpClient) {}

  getUserMessages(
    userID: string,
    pageIndex: number,
    pageSize: number = 15,
    type: string = "by"
  ) {
    return this.client.get<Messages>(
      this.baseURL +
        "/GetMessages/" +
        type +
        "?pageIndex=" +
        pageIndex +
        "&pageSize=" +
        pageSize
    );
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
