import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message } from "../shared/Models/message.model";
import { NewMessage } from "../shared/Models/newMessage.model";
import { MessageService } from "../shared/Services/message.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"],
})
export class MessageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: MessageService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private gameID;
  private userID = localStorage.getItem("UserID");
  private formGroup: FormGroup;
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.gameID = param["gameID"];
    });

    this.formGroup = this.fb.group({
      subject: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  onSubmit() {
    let model = new NewMessage();

    model.Content = this.formGroup.get("content").value;
    model.Subject = this.formGroup.get("subject").value;
    model.SenderID = localStorage.getItem("UserID");
    model.GameID = this.gameID;

    this.service.sendMessage(model).subscribe(
      (res) => {
        this.router.navigateByUrl("/messages");
      },
      (err) => {
        this.toastr.error("Cannot send a message, try again");
      }
    );
  }
}
