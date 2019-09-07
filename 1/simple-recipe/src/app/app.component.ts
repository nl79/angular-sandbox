import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'simple-recipe';
  loadedFeature: string = 'recipe';

  constructor(private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId) {


  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {

    if(isPlatformBrowser(this.platformId)) {
      // do any localStorage logic here that is not avaiable on the server
    }

    // Check the autologin user credentials if reloaded the page.
    this.authService.autoLogin();

    firebase.initializeApp({
      apiKey: 'AIzaSyDT5peUEZ28XVE6vuHz6u5LFLMYF3aS494',
      authDomain: 'ng-recipe-book-3952a.firebaseapp.com'
    })

  }

}
