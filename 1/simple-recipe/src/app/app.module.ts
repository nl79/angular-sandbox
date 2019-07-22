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

import { AlertComponent } from './shared/alert.component';

import { AppRoutingModule } from "./app-routing.module";

import { RecipeService } from "./recipes/recipe.service";
import { RecipesModule } from "./recipes/recipes.module"
import { DataStorageService } from "./shared/data-storage.service";
import { HttpModule } from "@angular/http";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth-guard.service";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    SignupComponent,
    SigninComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
