import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { UserComponent } from "./user.component";
import { UserService } from "./user.service";
import { DataService } from "../shared/data.service";

describe("UserComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });
  });
  // compileComponent is not needed while using webpack or angluar CLI

  it("should create the app", () => {
    // Create the component as if it the user browser to the component on the page and angular created it
    // for the decorator.
    let fixture = TestBed.createComponent(UserComponent);

    // component being tested.
    let app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });

  it("should use the user name from the service", () => {
    let fixture = TestBed.createComponent(UserComponent);

    // component being tested.
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);

    // Need to execute the change detection cycle to update the component
    fixture.detectChanges();

    expect(userService.user.name).toEqual(app.user.name);
  });

  it("should display the user name if the user is logged in", () => {
    let fixture = TestBed.createComponent(UserComponent);

    // component being tested.
    let app = fixture.debugElement.componentInstance;

    app.isLoggedIn = true;

    // Need to execute the change detection cycle to update the component
    fixture.detectChanges();

    // Need to compile the template code to get access to the rendered HTML
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p").textContent).toContain(app.user.name);
  });

  it("should not display the user name if the user is logged in", () => {
    let fixture = TestBed.createComponent(UserComponent);

    // component being tested.
    let app = fixture.debugElement.componentInstance;

    // Need to execute the change detection cycle to update the component
    fixture.detectChanges();

    // Need to compile the template code to get access to the rendered HTML
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p").textContent).not.toContain(
      app.user.name
    );
  });

  it("shouldn't fetch data succesfully if not called asynchronously", () => {
    let fixture = TestBed.createComponent(UserComponent);

    // component being tested.
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("data")
    );

    // Need to execute the change detection cycle to update the component
    fixture.detectChanges();
    expect(app.data).toBe(undefined);
  });

  it("shouldn fetch data succesfully if not called asynchronously", async(() => {
    let fixture = TestBed.createComponent(UserComponent);

    // component being tested.
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("data")
    );

    // Need to execute the change detection cycle to update the component
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.data).toBe("data");
    })
  }));

  it("shouldn fetch data succesfully if not called asynchronously", fakeAsync(() => {
    let fixture = TestBed.createComponent(UserComponent);

    // component being tested.
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("data")
    );

    // Need to execute the change detection cycle to update the component
    fixture.detectChanges();
    tick();
    expect(app.data).toBe("data");

  }));
});
