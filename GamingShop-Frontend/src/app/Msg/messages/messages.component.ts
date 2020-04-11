import { Component, OnInit } from "@angular/core";
import { Messages } from "../../shared/Models/messages.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "src/app/shared/Services/message.service";
import { Message } from "../../shared/Models/message.model";

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
      (res: any) => {
        switch (this.type) {
          case "by":
            {
              this.message = res.MessagesSentByUser;
              this.message.forEach(
                (el) => (el.Sent = this.formatDate(new Date(el.Sent)))
              );
            }
            break;
          case "to":
            {
              this.message = res.MessagesSentToUser;
              this.message.forEach(
                (el) => (el.Sent = this.formatDate(new Date(el.Sent)))
              );
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

  goToDetails(id: number) {
    this.router.navigateByUrl("message/" + id);
  }

  formatDate(date: Date): string {
    return `${date.toLocaleDateString()}/${date.toLocaleTimeString()}`;
  }
}
