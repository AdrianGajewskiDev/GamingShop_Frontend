import { Component, OnInit } from "@angular/core";
import { Routes, ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrderModel } from "../shared/Models/order.model";
import { CartService } from "../shared/Services/cart.service";
import { OrderService } from "../shared/Services/order.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  cardID: number;
  orderForm: FormGroup;
  sumbited = false;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cardID = params["cartID"];
    });

    this.orderForm = this.fb.group({
      FirstName: ["", Validators.required],
      LastName: ["", Validators.required],
      Country: ["", Validators.required],
      City: ["", Validators.required],
      State: [""],
      Street: ["", Validators.required],
      PostalCode: ["", [Validators.required, Validators.minLength(5)]],
      AlternativeEmailAdress: [""],
      AlternativePhoneNumber: [""]
    });
  }

  onSubmit() {
    this.sumbited = true;
    var orderModel: OrderModel = {
      FirstName: this.orderForm.get("FirstName").value,
      LastName: this.orderForm.get("LastName").value,
      Country: this.orderForm.get("Country").value,
      City: this.orderForm.get("City").value,
      State: this.orderForm.get("State").value,
      Street: this.orderForm.get("Street").value,
      PostalCode: this.orderForm.get("PostalCode").value,
      AlternativeEmailAdress: this.orderForm.get("AlternativeEmailAdress")
        .value,
      AlternativePhoneNumber: this.orderForm.get("AlternativePhoneNumber").value
    };

    this.orderService.placeOrder(this.cardID, orderModel).subscribe(res => {
      this.toastr.success(
        "Your order has been placed!! Check your email for details"
      );
      this.router.navigateByUrl("games");
    });
  }
}
