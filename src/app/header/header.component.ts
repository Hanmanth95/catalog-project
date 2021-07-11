import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("feedbackHistory");
  }
}
