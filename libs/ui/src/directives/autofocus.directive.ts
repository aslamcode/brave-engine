import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutoFocusDirective {

  constructor(
    private elementRef: ElementRef
  ) {
    this.focus();
  }

  private focus() {
    setTimeout(() => {
      const event = new Event('focus');
      this.elementRef.nativeElement.dispatchEvent(event);
    }, 0);
  }
}
