import { Component, OnInit } from "@angular/core";
import { Routes, ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrderModel } from "../../shared/Models/order.model";
import { CartService } from "../../shared/Services/cart.service";
import { OrderService } from "../../shared/Services/order.service";
import { ToastrService } from "ngx-toastr";
import { FormsMapper } from "src/app/shared/HelperClasses/formsMapper";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService,
    private mapper: FormsMapper
  ) {}

  cardID: number;
  orderForm: FormGroup;
  sumbited = false;
  ngOnInit() {
    this.route.params.subscribe((params) => {
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
      AlternativePhoneNumber: [""],
    });
  }

  onSubmit() {
    this.sumbited = true;

    var orderModel: OrderModel = new OrderModel();
    let result = this.mapper.map<OrderModel>(orderModel, this.orderForm);
    console.log(result);

    this.orderService.placeOrder(this.cardID, result).subscribe((res) => {
      this.toastr.success(
        "Your order has been placed!! Check your email for details"
      );
      this.router.navigateByUrl("games");
    });
  }
}
