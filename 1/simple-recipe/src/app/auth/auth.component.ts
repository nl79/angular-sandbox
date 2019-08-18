import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable, Subscribable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;

  isLoading = false;

  error: string = null;

  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(error) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
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
        this.showErrorAlert(error);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
