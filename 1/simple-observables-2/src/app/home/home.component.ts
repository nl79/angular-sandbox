import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval, Subscription, Observable, Observer } from "rxjs";
import { map, filter } from "rxjs/operators";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log('count', count);
    // });

    const customIntervalObserable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        console.log("here");
        observer.next(count);

        if (count == 2) {
          observer.complete("done");
        }

        if (count > 3) {
          observer.error(new Error("count is greater 3!"));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObserable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          console.log("data#here", data);
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        count => {
          console.log("coung#2", count);
        },
        error => {
          console.log("error", error);
        },
        done => {
          console.log("done", done);
        }
      );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
