import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable()
export class AuthService {
  token: string;

  firebaseApiKey: string = "AIzaSyDT5peUEZ28XVE6vuHz6u5LFLMYF3aS494";

  constructor(private router: Router, private http: HttpClient) {}

  // angular http method
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
          this.firebaseApiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
        this.firebaseApiKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An Unknown error occured!";
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
    }

    return throwError(errorMessage);
  }

  // firebase method

  signupUser(email: string, password: string) {
    console.log("here");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log("res", res);
        this.router.navigate(["/"]);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
          });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  getToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => {
        this.token = token;
      });

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
