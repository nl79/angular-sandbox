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
  defaultQuestion: string = 'pet';
  answer: '';

  genders = ['male', 'female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: "",
    gender: ''
  }

  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.singupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ""
    //   },
    //   secret: 'pet',
    //   // defaultQuestion: '',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    this.singupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(e, f: NgForm) {
  //   console.log('submitted', e);
  //   console.log('f', f)
  // }

  // Local ref examle
  onSubmit() {
    console.log('singupform', this.singupForm);
    this.user.username = this.singupForm.value.userData.username;
    this.user.email = this.singupForm.value.userData.email;
    this.user.secretQuestion = this.singupForm.value.secret;
    this.user.answer = this.singupForm.value.questionAnswer;
    this.user.gender = this.singupForm.value.gender;


    this.submitted = true;

    this.singupForm.reset()
  }
}
