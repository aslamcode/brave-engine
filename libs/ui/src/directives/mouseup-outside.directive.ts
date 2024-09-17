import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[mouseupOutside]'
})
export class MouseupOutsideDirective {

  constructor(
    private elementRef: ElementRef
  ) {
  }

  @Output()
  mouseupOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:mouseup', ['$event', '$event.target'])
  onMouseup(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const mouseupInside = this.elementRef.nativeElement.contains(targetElement);
    if (!mouseupInside) {
      this.mouseupOutside.emit(event);
    }
  }
}
