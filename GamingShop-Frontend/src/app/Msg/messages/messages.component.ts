import { Component, OnInit } from "@angular/core";
import { Messages } from "../../shared/Models/messages.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "src/app/shared/Services/message.service";
import { Message } from "../../shared/Models/message.model";
import { PaginationInfo } from "src/app/shared/Models/paginatedResponseInfo";

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
  private pageNumber = 1;
  private pageSize = 14;
  private paginationInfo: PaginationInfo;
  ngOnInit() {
    this.type = localStorage.getItem("msgType");

    if (this.type == null) this.type = "to";

    this.getMessages();
    this.toggleActiveClass();
  }

  showMsgTo() {
    localStorage.setItem("msgType", "to");
    window.location.reload();
  }

  showMsgBy() {
    localStorage.setItem("msgType", "by");
    window.location.reload();
  }

  toggleActiveClass() {
    if (this.type == "by") {
      document.getElementById("sent").classList.add("active");
      document.getElementById("inbox").classList.remove("active");
    } else {
      document.getElementById("sent").classList.remove("active");
      document.getElementById("inbox").classList.add("active");
    }
  }

  goToDetails(id: number) {
    this.router.navigateByUrl("message/" + id);
  }

  formatDate(date: Date): string {
    return `${date.toLocaleDateString()}/${date.toLocaleTimeString()}`;
  }

  getMessages() {
    this.service
      .getUserMessages(this.userID, this.pageNumber, this.pageSize, this.type)
      .subscribe(
        (res: any) => {
          switch (this.type) {
            case "by":
              {
                this.message = res.Items;
                this.paginationInfo = res.ResponseInfo;
                this.message.forEach(
                  (el) => (el.Sent = this.formatDate(new Date(el.Sent)))
                );
              }
              break;
            case "to":
              {
                this.message = res.Items;
                this.paginationInfo = res.ResponseInfo;
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

  goNext() {
    if (this.paginationInfo.HasNext) {
      this.pageNumber += 1;
      this.getMessages();
    }
  }

  goPrevious() {
    if (this.paginationInfo.HasPrevious) {
      this.pageNumber -= 1;
      this.getMessages();
    }
  }
}
