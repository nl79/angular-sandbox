import { NgModel } from "@angular/forms";
import { NgSelectMultipleOption } from "@angular/forms/src/directives";
import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule
} from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
// import { AuthGuard } from "./auth/auth-guard.service";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
  // the default root route must have a pathMath option set to full because it will technically
  // match every route
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'auth', component: AuthComponent}

]

@NgModule(
  {
    imports: [
      RouterModule.forRoot(appRoutes)
    ],

    exports: [
      RouterModule
    ]
  }
)
export class AppRoutingModule {

}
