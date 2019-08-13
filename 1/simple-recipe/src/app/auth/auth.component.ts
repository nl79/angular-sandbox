import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent {
  isLoginMode = true;

  isLoading = false;

  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log("form", form);
    if (!form.valid) {
      return false;
    }

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      data => {
        console.log("data", data);

        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      error => {
        console.log("error", error);

        this.error = error;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
