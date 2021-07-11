import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log("canActivate called");
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(["/catalog/list"], {
        queryParams: { sort: "hightolow" },
      });
      return false;
    }
    return true;
  }
}
