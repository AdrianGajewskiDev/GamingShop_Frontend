import { Component, OnInit } from "@angular/core";
import { Message } from "../../shared/Models/message.model";
import { MessageService } from "src/app/shared/Services/message.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NewMessage } from "src/app/shared/Models/newMessage.model";

@Component({
  selector: "app-message-details",
  templateUrl: "./message-details.component.html",
  styleUrls: ["./message-details.component.css"],
})
export class MessageDetailsComponent implements OnInit {
  constructor(
    private service: MessageService,
    private routes: ActivatedRoute,
    private router: Router
  ) {}

  private message: Message;
  private msgID: number;
  private replyContent: string;

  ngOnInit() {
    this.routes.params.subscribe((param) => {
      this.msgID = parseInt(param["id"]);
    });

    this.service.getMessageDetails(this.msgID).subscribe(
      (res: any) => {
        this.message = res;
      },
      (error) => console.log(error)
    );
  }

  reply() {
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
