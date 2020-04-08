import { Component, OnInit } from "@angular/core";
import { MessageService } from "../shared/Services/message.service";
import { Messages } from "../shared/Models/messages.model";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  constructor(private service: MessageService) {}

  private userID = localStorage.getItem("UserID");
  private messages: Messages;

  ngOnInit() {
    this.service.getUserMessages(this.userID).subscribe(
      (res) => {
        console.log(res);

        this.messages = res;
      },
      (error) => console.log(error)
    );
  }
}
