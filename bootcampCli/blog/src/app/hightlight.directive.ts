import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hightlight]'
})
export class Hightlight {

  //constructor() {}

  constructor(el: ElementRef) {
     el.nativeElement.style.backgroundColor = 'yellow';
  }

}
