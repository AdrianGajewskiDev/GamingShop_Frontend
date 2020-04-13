import { Component, OnInit } from "@angular/core";
import { Message } from "../../shared/Models/message.model";
import { MessageService } from "src/app/shared/Services/message.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NewMessage } from "src/app/shared/Models/newMessage.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-message-details",
  templateUrl: "./message-details.component.html",
  styleUrls: ["./message-details.component.css"],
})
export class MessageDetailsComponent implements OnInit {
  constructor(
    private service: MessageService,
    private routes: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private message: Message;
  private msgID: number;
  private replyContent: string;
  private sentByCurrentUser: boolean;

  ngOnInit() {
    this.routes.params.subscribe((param) => {
      this.msgID = parseInt(param["id"]);
    });

    this.service.getMessageDetails(this.msgID).subscribe(
      (res: any) => {
        this.message = res;
        this.sentByCurrentUser =
          this.message.SenderID == localStorage.getItem("UserID");
      },
      (error) => console.log(error)
    );
  }

  reply() {
    if (this.sentByCurrentUser == true) {
      this.toastr.info("You cannot reply to your own message!!");
      return;
    }

    let model = new Message();
    model.Content = this.replyContent;
    model.RecipientEmail = this.message.SenderEmail;
    model.SenderEmail = this.message.RecipientEmail;
    model.Subject = this.message.Subject + "-reply";
    model.RecipientID = this.message.SenderID;
    model.SenderID = this.message.RecipientID;
    model.Replying = true;

    this.service.sendMessageMSG(model).subscribe(
      (res: any) => {
        this.router.navigateByUrl("/messages");
      },
      (error) => console.log(error)
    );
  }
}
