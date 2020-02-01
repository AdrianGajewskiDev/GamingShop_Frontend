import { Component, OnInit } from "@angular/core";
import { Routes, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  cardID: number;
  orderForm: FormGroup;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cardID = params["cartID"];
    });

    this.orderForm = this.fb.group({
      Name: ["", Validators.required],
      LastName: ["", Validators.required],
      Country: ["", Validators.required],
      City: ["", Validators.required],
      State: [""],
      Street: ["", Validators.required],
      PostalCode: [Validators.required, Validators.minLength(5)],
      AlternativeEmailAdress: [""],
      AlternativePhoneNumber: [""]
    });
  }
}
