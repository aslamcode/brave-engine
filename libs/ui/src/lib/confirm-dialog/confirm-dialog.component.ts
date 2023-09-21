import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, ElementRef } from '@angular/core';
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
import { UiConfirmDialogService } from './services/confirm-dialog.service';

@Component({
  selector: 'ui-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
export class ConfirmDialogComponent implements OnInit {

  static animation: any = { in: slideInDown, out: slideOutDown };

  @Input() isOpen = false;
  @Input() canOverlayDismiss = true;


  @Output() openDialog: EventEmitter<any> = new EventEmitter();
  @Output() closeDialog: EventEmitter<any> = new EventEmitter();

  animDirection = 'zoom';

  title!: string;
  text!: string;

  constructor(
    private confirmDialogService: UiConfirmDialogService,
    private elementRef: ElementRef,
  ) {
    this.confirmDialogService.open$.subscribe(({ title, text }) => {
      this.title = title;
      this.text = text;
      this.open();
    });
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }

  open(anim?: ConfirmDialogAnimation) {
    this.setAnim(anim);
    this.isOpen = true;
    this.openDialog.emit();
  }

  close(anim?: ConfirmDialogAnimation) {
    this.setAnim(anim);
    this.isOpen = false;
    this.closeDialog.emit();
  }

  accept() {
    this.confirmDialogService.accept$.next();
    this.close();
  }

  reject() {
    this.confirmDialogService.reject$.next();
    this.close();
  }

  dismiss() {
    if (this.canOverlayDismiss) {
      this.reject();
      this.close();
    }
  }

  private setAnim(anim?: ConfirmDialogAnimation) {
    this.animDirection = anim || this.animDirection;
  }

}

export type ConfirmDialogAnimation = 'zoom' | 'top' | 'right' | 'bottom' | 'left';
