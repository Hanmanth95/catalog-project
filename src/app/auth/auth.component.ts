import { Component, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { CatalogService } from "../services/catalog.service";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  emailError = false;
  pwdError = false;
  constructor(
    private router: Router,
    private authObs: CatalogService,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$&*%]).{8,}/;

    let isEmailValid = emailPattern.test(email);
    if (isEmailValid === false) {
      this.emailError = true;
      this.pwdError = false;
      return;
    } else {
      this.emailError = false;
    }

    let isPwdValid = passwordPattern.test(password);
    if (isPwdValid === false) {
      this.pwdError = true;
      this.emailError = false;
      return;
    } else {
      this.pwdError = false;
    }

    this.authService.login({ email: email, password: password }).subscribe(
      (res) => {
        console.log("login response");
        console.log(res);
        if (res.token) {
          localStorage.setItem("token", res.token);
          this.authObs.authCheck.next("LOGIN_CHECK");
          this.router.navigate(["/catalog/list"], {
            queryParams: { start: 0, sort: "hightolow" },
          });
        }
        form.reset();
      },
      (err) => {
        console.log("error occured");
        console.log(err);
      }
    );
  }
}
