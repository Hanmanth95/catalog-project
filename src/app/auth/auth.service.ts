import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): boolean {
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(["/catalog/list"], {
        queryParams: { start: 0, sort: "hightolow" },
      });
      return false;
    }
    return true;
  }

  login(loginData): Observable<any> {
    return this.http.post<any>("/login", loginData);
  }
}
