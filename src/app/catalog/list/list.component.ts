import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CatalogService } from "../../services/catalog.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  start = 0;
  productList = [];
  totalCount = 0;
  productsFields = {
    Order_Number: Number,
    Order_Due_Date: Date,
    Order_Value: Number,
    Buyer_Name: "",
    Buyer_Address: "",
    Buyer_Mobile: Number,
  };

  constructor(
    private catalog: CatalogService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.catalog.getIngredients().subscribe((apiResponse) => {
      console.log(apiResponse);
      this.productList = apiResponse;
    });
  }

  openLg(template: TemplateRef<any>) {
    this.modalService.open(template);
  }

  addProduct(f) {
    this.catalog.saveProduct(f.form.value).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.productList = res;
        f.form.reset();
        this.modalService.dismissAll();
      }
    });
  }

  editProduct(item, template) {
    this.productsFields.Order_Number = item.orderNo;
    this.productsFields.Order_Due_Date = item.orderDueDate;
    this.productsFields.Order_Value = item.orderValue;
    this.productsFields.Buyer_Name = item.buyerName;
    this.productsFields.Buyer_Address = item.buyerAddr;
    this.productsFields.Buyer_Mobile = item.mobileNo;
    this.modalService.open(template);
  }

  deleteProduct(item) {
    this.catalog.deleteProduct(item.orderNo).subscribe((res: any) => {
      this.productList = res;
    });
  }
}
