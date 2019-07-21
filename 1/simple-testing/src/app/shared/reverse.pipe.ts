import { Pipe } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: "reverse"
})
export class ReversePipe {
  transform(value: string) {
    return value.split("").reverse().join("");
  }
}
