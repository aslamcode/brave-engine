import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[aIf]'
})
export class AnimatedIfDirective {

  @Input() fadeIn = '';
  @Input() fadeOut = '';
  @Input() startWithAnim = true;

  private isVisible = false;
  private element: HTMLElement;
  private started = false;

  constructor(
    private elementRef: ElementRef
  ) {
    this.element = this.elementRef.nativeElement;
  }

  @Input()
  set aIf(value: boolean) {
    this.isVisible = value;
    this.updateView();
    this.started = true;
  }

  private updateView() {
    if (this.startWithAnim && !this.started && this.isVisible) {
      this.element.classList.add(this.fadeIn);
    } else if (!this.startWithAnim && !this.started && !this.isVisible || this.startWithAnim && !this.started && !this.isVisible) {
      this.element.style.display = 'none';
    } else if (this.started) {
      if (this.isVisible) {
        this.element.classList.add(this.fadeIn);
        this.element.style.display = '';
      } else {
        this.element.classList.add(this.fadeOut);
      }
    }
  }

  @HostListener('animationend')
  animationEnd() {
    if (!this.isVisible) {
      this.element.style.display = 'none';
    }

    this.element.classList.remove(this.fadeIn);
    this.element.classList.remove(this.fadeOut);
  }

}
