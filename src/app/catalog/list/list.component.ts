import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  paramSubscriber: any;
  selectedDropDown: any;
  column = "Price";
  order: any;
  fltArr = ["hightolow", "lowtohigh"];

  constructor(
    private catalog: CatalogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedDropDown = this.fltArr[0];
    this.paramSubscriber = this.route.queryParams.subscribe((params) => {
      this.selectedDropDown = params.sort;
      this.start = params.start;
      if (this.selectedDropDown == "lowtohigh") {
        this.order = "asc";
      } else {
        this.order = "desc";
      }
      let apiResponse = this.catalog.getIngredients(this.start, this.order);
      if (this.start == 0) {
        this.productList = apiResponse.products;
      } else {
        this.productList.push(...apiResponse.products);
      }
      this.totalCount = apiResponse.count;
    });
  }

  onScroll() {
    if (this.productList.length == this.totalCount) {
      return;
    }
    let apiResponse: any = this.catalog.getIngredients(
      this.productList.length,
      this.order
    );
    this.productList.push(...apiResponse.products);
  }

  @HostListener("window:scroll", [])
  scrollFx(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.onScroll();
    }
  }

  previousImage(item) {
    if (item.ColorsCount == 0) {
    } else {
      item.ColorsCount--;
    }
  }

  nextImage(item) {
    if (item.ColorsCount == item.Images.length - 1) {
    } else {
      item.ColorsCount++;
    }
  }

  applyFilters() {
    if (this.selectedDropDown == "lowtohigh") {
      this.order = "asc";
    } else {
      this.order = "desc";
    }
    this.router.navigate(["/catalog/list"], {
      queryParams: { start: 0, sort: this.selectedDropDown },
    });
  }
}
