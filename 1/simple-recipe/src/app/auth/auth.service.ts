import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";

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

  private tokenExpirationTimer: any;

  firebaseApiKey: string = "AIzaSyDT5peUEZ28XVE6vuHz6u5LFLMYF3aS494";

  // Angular http method
  user = new BehaviorSubject<User>(null);

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
      .pipe(
        catchError(this.handleError),
        tap(data => {
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            +data.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
          this.firebaseApiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(data => {
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            +data.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
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

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();

    }, expirationDuration)
  }

  logout() {
    this.user.next(null);

    firebase.auth().signOut();
    this.token = null;

    this.router.navigate(['/auth'])

    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
}
