
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {

  }

  signupUser(email: string, password: string) {

    console.log('here');
    firebase.auth().createUserWithEmailAndPassword(
      email, password
    ).then(
      (res) => {
        console.log('res', res);
      }
    ).catch(
      (err) => {
        console.log('err', err);
      }
    )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).
    then(
      (res) => {
        console.log('res', res);
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().
        then(
          (token: string) => {
            this.token = token;
          }
        )
      }
    ).catch(
      (err) => {
        console.log('err', err);
      }
    )
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      token => {
        this.token = token;
      }
    )

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
