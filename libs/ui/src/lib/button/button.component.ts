import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { MatRipple, RippleConfig } from '@angular/material/core';

// Improve button folowing this solution
// https://stackoverflow.com/questions/49415692/can-you-prevent-an-angular-components-host-click-from-firing

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MatRipple]
})
export class ButtonComponent implements OnInit {
  @Input() disabled = false;

  @Input() @HostBinding('style.backgroundColor') color?: string;
  @Input() @HostBinding('style.color') textColor?: string;

  @Input() loading = false;

  @Input() href = '';
  @Input() target = '_blank';

  @Input() ripple = true;
  @Input() whiteRipple = false;

  private rippleConfig: RippleConfig = {
    persistent: false,
    terminateOnPointerUp: false,
    animation: {
      enterDuration: 300,
      exitDuration: 500
    }
  };

  constructor(
    private matRipple: MatRipple,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }

  @HostListener('mousedown', ['$event'])
  hostMouseDown(event: MouseEvent) {
    if (this.canInteract && this.ripple) {
      const rippleConfig = { ...this.rippleConfig };

      if (this.whiteRipple) {
        rippleConfig.color = 'rgba(255, 255, 255, 0.3)';
      }

      this.matRipple.launch(event.x, event.y, rippleConfig);
    }
  }

  @HostListener('click')
  hostMouseClick() {
    if (this.canInteract && this.href) {
      const linkElement = document.createElement('a');
      linkElement.href = this.href;
      linkElement.target = this.target;
      linkElement.click();
    }
  }

  @HostBinding('class.-disabled')
  get disabledHostClass() {
    return !this.canInteract;
  }

  get buttonContentVisibility() {
    return this.loading ? 'hidden' : 'visible';
  }

  get canInteract() {
    return !this.loading && !this.disabled;
  }
}
