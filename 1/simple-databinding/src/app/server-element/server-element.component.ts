import {
  Component,
  OnInit,
  OnChanges ,
  Input,
  ViewEncapsulation,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // Prevents custom attributes from being applied to isolate the
  // css selector chain for this component
  encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewChecked, AfterViewInit, OnDestroy  {
  // Allow for this property to be exposed to parent components
  @Input('server')
  element: {type: string, name: string, content: string};

  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() { }
  ngDoCheck() {
    console.log('ngDoChange called!')
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!', changes)
  }
  ngOnInit() {
    console.log('ngOnInit called!');
    console.log('textContent', this.header.nativeElement.textContent);
    console.log('paragraph', this.header.nativeElement.textContent);
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called!')
    console.log('paragraph', this.header.nativeElement.textContent);

  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked called!')
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called!');
    console.log('textContent', this.header.nativeElement.textContent);


  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called!')
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called!')
  }

}
