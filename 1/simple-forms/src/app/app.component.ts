import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f')
  singupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(e, f: NgForm) {
  //   console.log('submitted', e);
  //   console.log('f', f)
  // }

  // Local ref examle
  onSubmit() {
    console.log('singupform', this.singupForm);
  }
}
