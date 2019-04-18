import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];

  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  ngOnInit() {

    // Need to wire this to the HTML form using directives.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmail.bind(this)]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // form value change obervable 
    this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log('value', value)
      }
    )

    // Status change observable
    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log('status', status);
      }
    )

    this.signupForm.setValue(
      {
        'userData': {
          'username': 'test',
          'email': 'test@test.com'
        },
        'gender': 'male',
        'hobbies': []

      }
    )

    this.signupForm.patchValue(
      {
        'userData': {
          'username': 'test reset',
          'email': 'test@test.com'
        }

      }
    )
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // Custom validator 
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }

  // Async custom validator 
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject)  => {
      setTimeout(
        () => {
          if (control.value === 'test@test.com') {
            resolve({
              'emailIsForbidden': true
            });
          } else {
            resolve(null);
          }
        },
        1500
      )
    })

    return promise;
  }

}
