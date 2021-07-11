import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-feedback",
  templateUrl: "./user-feedback.component.html",
  styleUrls: ["./user-feedback.component.css"],
})
export class UserFeedbackComponent implements OnInit {
  feedbackHistory: any = [];
  useFeed: any = {
    userName: "",
    userEmail: "",
    userMobile: "",
    userContent: "",
  };

  errors = {
    emailError: false,
    nameError: false,
    mobileError: false,
  };
  constructor() {}

  ngOnInit() {
    if (localStorage.getItem("feedbackHistory")) {
      this.feedbackHistory.push(
        ...JSON.parse(localStorage.getItem("feedbackHistory"))
      );
    }
  }

  submitFeedback(f) {
    if (!f.valid) {
      return;
    }
    this.feedbackHistory.push(f.form.value);
    localStorage.setItem(
      "feedbackHistory",
      JSON.stringify(this.feedbackHistory)
    );
    f.form.reset();
  }

  validateEmail(f) {
    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (
      !f.form.controls.email.value ||
      !emailPattern.test(f.form.controls.email.value)
    ) {
      this.errors.emailError = true;
    } else {
      this.errors.emailError = false;
    }
  }

  validateMobile(f) {
    const phonePattern = new RegExp("^[2-9][0-9]{9}$");
    if (
      !f.form.controls.mobile.value ||
      !phonePattern.test(f.form.controls.mobile.value)
    ) {
      this.errors.mobileError = true;
    } else {
      this.errors.mobileError = false;
    }
  }

  validateName(f) {
    const namePattern = new RegExp("^[A-Za-z]{1}[A-Za-z0-9',\\s-]{2,99}$");
    if (
      !f.form.controls.name.value ||
      !namePattern.test(f.form.controls.name.value)
    ) {
      this.errors.nameError = true;
    } else {
      this.errors.nameError = false;
    }
  }
}
