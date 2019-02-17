import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/Rx';
// import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  myNumbersSub: Subscription;
  myCustomObservable: Subscription;

  constructor() { }

  ngOnDestroy() {
    this.myCustomObservable.unsubscribe();
    this.myNumbersSub.unsubscribe();
  }
  ngOnInit() {
      let myNumbers = interval(1000).pipe(map(
        (data: number)  => {
          return data * 2;
        }
      ))
      this.myNumbersSub = myNumbers.subscribe(
        (number: number) => {
          console.log('number', number)
        },
        () => {

        },
        () => {

        }
      )

    let myObservable = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);

      setTimeout(() => {
        observer.next('second package');
      }, 4000);

      setTimeout(() => {
        observer.error('this does not work');
      }, 5000);

      setTimeout(() => {
        observer.complete();
      }, 6000);
    });

    this.myCustomObservable = myObservable.subscribe(
      (data: String) => {
        console.log('data', data);
      },
      (error: String) => {
        console.log('error', error);
      },
      () => {
        console.log('completed');
      }
    )


  }

}
