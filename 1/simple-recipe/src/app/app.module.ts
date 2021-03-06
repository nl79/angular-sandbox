import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { ShoppingListService } from "./shopping-list/shoppig-list.service";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";

import { AlertComponent } from "./shared/alert.component";

import { AppRoutingModule } from "./app-routing.module";

import { RecipeService } from "./recipes/recipe.service";
import { RecipesModule } from "./recipes/recipes.module";
import { DataStorageService } from "./shared/data-storage.service";
import { HttpModule } from "@angular/http";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthService } from "./auth/auth.service";
// import { AuthGuard } from "./auth/auth-guard.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthInterceptorService } from "./auth/auth.service.interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./shared/placeholder.directive";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    SignupComponent,
    SigninComponent,
    AlertComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule.withServerTransition({appId: "my-app"}),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    RecipesModule,
    ShoppingListModule,
    HttpClientModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService,
    // AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule {}
