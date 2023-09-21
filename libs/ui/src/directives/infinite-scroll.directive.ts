import { Directive, Output, Input, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective {

  /** Range 0 to 100 */
  @Input() topDistance = 20;

  /** Range 0 to 100 */
  @Input() bottomDistance = 20;

  /** Time in miliseconds */
  @Input() throttleTime = 150;

  @Input() wheelEventEnabled = true;

  /** Scroll up event */
  @Output() scrollUp = new EventEmitter<InfiniteScrollDirectionEnum>();

  /** Scroll down event */
  @Output() scrollDown = new EventEmitter<InfiniteScrollDirectionEnum>();

  private lastDirection!: InfiniteScrollDirectionEnum;
  private currentPercentage!: number;
  private lastPercentage = 0;
  private timeoutScrollEvent: any;
  private timeoutWheelEvent: any;

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('scroll', ['$event.target'])
  listenScroll(element: HTMLElement) {
    clearTimeout(this.timeoutScrollEvent);
    clearTimeout(this.timeoutWheelEvent);

    this.updateCurrentPercentage(element);

    this.timeoutScrollEvent = setTimeout(() => {
      this._listenScroll();
    }, this.throttleTime);
  }

  @HostListener('wheel', ['$event'])
  listenWheel(e: WheelEvent) {
    if (this.wheelEventEnabled) {
      clearTimeout(this.timeoutWheelEvent);

      this.timeoutWheelEvent = setTimeout(() => {
        this._listenWheel(e);
      }, this.throttleTime);
    }
  }

  private _listenWheel(e: WheelEvent) {
    const element = this.elementRef.nativeElement;

    if (element.scrollHeight == element.offsetHeight && element.scrollTop == 0) {
      if (e.deltaY > 0) {
        this.scrollDown.emit(InfiniteScrollDirectionEnum.down);
      } else {
        this.scrollUp.emit(InfiniteScrollDirectionEnum.up);
      }
    }
  }

  private _listenScroll() {
    if (this.lastDirection == InfiniteScrollDirectionEnum.down) {
      if (this.currentPercentage >= 100 - Number(this.bottomDistance)) {
        this.scrollDown.emit(InfiniteScrollDirectionEnum.down);
      }
    } else {
      if (this.currentPercentage <= Number(this.topDistance)) {
        this.scrollUp.emit(InfiniteScrollDirectionEnum.up);
      }
    }
  }

  private updateCurrentPercentage(element: HTMLElement) {
    const totalHeight = element.scrollHeight - element.offsetHeight;
    const currentPosition = element.scrollTop;
    this.currentPercentage = currentPosition / totalHeight * 100;

    this.lastDirection = this.currentPercentage > this.lastPercentage ? InfiniteScrollDirectionEnum.down : InfiniteScrollDirectionEnum.up;
    this.lastPercentage = this.currentPercentage;
  }

}

enum InfiniteScrollDirectionEnum {
  up = -1,
  down = 1
}
