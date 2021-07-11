import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(["/catalog/list"], {
        queryParams: { start: 0, sort: "hightolow" },
      });
      return false;
    }
    return true;
  }
}
