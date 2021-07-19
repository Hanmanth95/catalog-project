import { Component, OnDestroy, OnInit } from "@angular/core";
import { CatalogService } from "./services/catalog.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "angular-catalog";
  isLoggedIn: any;
  listenEvent: any;

  constructor(private catalog: CatalogService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem("token") ? true : false;
    this.listenEvent = this.catalog.authCheck.subscribe((data) => {
      this.isLoggedIn = localStorage.getItem("token") ? true : false;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listenEvent.unsubscribe();
  }
}
