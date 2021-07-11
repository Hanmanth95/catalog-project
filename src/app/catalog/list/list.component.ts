import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { orderBy } from "lodash";
import { CatalogService } from "src/app/services/catalog.service";

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
    let apiResponse = this.catalog.getIngredients(this.start);
    this.productList.push(...apiResponse.products);
    this.totalCount = apiResponse.count;
    this.paramSubscriber = this.route.queryParams.subscribe((params) => {
      this.selectedDropDown = params.sort;
      this.applyFilters();
    });
    this.applyFilters();
  }

  onScroll() {
    if (this.productList.length == this.totalCount) {
      return;
    }
    let apiResponse = this.catalog.getIngredients(this.productList.length);
    this.productList.push(...apiResponse.products);
    this.applyFilters();
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

  applyFilters(urlChange?) {
    console.log(this.selectedDropDown);
    if (urlChange) {
      this.router.navigate(["/catalog/list"], {
        queryParams: { sort: this.selectedDropDown },
      });
    }

    if (this.selectedDropDown == "lowtohigh") {
      this.productList.sort();
      this.order = "asc";
    } else {
      this.productList.sort().reverse();
      this.order = "desc";
    }
    this.productList = orderBy(this.productList, [this.column], [this.order]);
  }
}
