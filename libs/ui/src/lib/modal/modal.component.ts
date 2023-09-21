import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, useAnimation, transition, animate, state, style } from '@angular/animations';
import {
  slideInDown,
  slideOutDown,
  slideInRight,
  slideOutRight,
  slideInLeft,
  slideOutLeft,
  slideInUp,
  slideOutUp,
  zoomOut,
  zoomIn
} from 'ng-animate';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modal', [
      transition('* => zoom', useAnimation(zoomIn, { params: { timing: 0.5 } })),
      transition('zoom => *', useAnimation(zoomOut, { params: { timing: 0.5 } })),
      transition('* => top', useAnimation(slideInUp, { params: { timing: 0.4 } })),
      transition('top => *', useAnimation(slideOutUp, { params: { timing: 0.4 } })),
      transition('* => bottom', useAnimation(slideInDown, { params: { timing: 0.4 } })),
      transition('bottom => *', useAnimation(slideOutDown, { params: { timing: 0.4 } })),
      transition('* => right', useAnimation(slideInRight, { params: { timing: 0.4 } })),
      transition('right => *', useAnimation(slideOutRight, { params: { timing: 0.4 } })),
      transition('* => left', useAnimation(slideInLeft, { params: { timing: 0.4 } })),
      transition('left => *', useAnimation(slideOutLeft, { params: { timing: 0.4 } }))
    ]),
    trigger('overlay', [
      state('default', style({ backgroundColor: 'rgba(0,0,0,0.5)' })),
      transition(':enter', [
        animate('0.5s'),
        style({ backgroundColor: 'rgba(0,0,0,0)' })
      ]),
      transition(':leave', [
        animate('0.5s',
          style({ backgroundColor: 'rgba(0,0,0,0)' })
        )
      ])
    ])
  ],
})
export class ModalComponent implements OnInit {

  static animation: any = { in: slideInDown, out: slideOutDown };

  @Input() isOpen = false;
  @Input() closeOnAccept = true;
  @Input() canOverlayDismiss = true;
  @Input() title = '';

  @Output() openChange: EventEmitter<void> = new EventEmitter();
  @Output() closeChange: EventEmitter<void> = new EventEmitter();

  animDirection = 'right';

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }


  open(anim?: ModalAnimation) {
    this.setAnim(anim);
    this.isOpen = true;
    this.openChange.emit();
  }

  close(anim?: ModalAnimation) {
    this.setAnim(anim);
    this.isOpen = false;
    this.closeChange.emit();
  }

  dismiss() {
    if (this.canOverlayDismiss) {
      this.close();
    }
  }

  private setAnim(anim?: ModalAnimation) {
    this.animDirection = anim || this.animDirection;
  }

}

export type ModalAnimation = 'zoom' | 'top' | 'right' | 'bottom' | 'left';
