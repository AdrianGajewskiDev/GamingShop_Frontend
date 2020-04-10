import { Component, OnInit } from "@angular/core";
import { Messages } from "../../shared/Models/messages.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "src/app/shared/Services/message.service";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  constructor(private router: Router, private service: MessageService) {}

  private userID = localStorage.getItem("UserID");
  private message: Message[];
  private type;

  ngOnInit() {
    this.type = localStorage.getItem("msgType");

    if (this.type == null) this.type = "to";

    this.service.getUserMessages(this.userID).subscribe(
      (res) => {
        switch (this.type) {
          case "by":
            {
              this.message = res.MessagesSentByUser;
            }
            break;
          case "to":
            {
              this.message = res.MessagesSentToUser;
            }
            break;
        }
      },
      (error) => console.log(error)
    );
  }

  showMsgTo() {
    localStorage.setItem("msgType", "to");
    window.location.reload();
  }
  showMsgBy() {
    localStorage.setItem("msgType", "by");
    window.location.reload();
  }
}
