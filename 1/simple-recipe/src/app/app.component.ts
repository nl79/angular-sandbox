import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'simple-recipe';
  loadedFeature: string = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {

    firebase.initializeApp({
      apiKey: 'AIzaSyDT5peUEZ28XVE6vuHz6u5LFLMYF3aS494',
      authDomain: 'ng-recipe-book-3952a.firebaseapp.com'
    })

  }

}
