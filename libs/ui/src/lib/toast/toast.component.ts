import { Component, ElementRef, OnInit } from '@angular/core';
import { trigger, transition, style, sequence, animate } from '@angular/animations';
import { ToastType } from './toast.model';
import { UiToastService } from './toast.service';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toast', [
      transition(':leave', [
        style({ opacity: '*', transform: 'translateX(0)' }),
        sequence([
          animate('.25s ease', style({ opacity: 0, transform: 'translateX(20px)' })),
        ])
      ]),
      transition(':enter', [
        style({ opacity: '0', transform: 'translateX(20px)', height: 0 }),
        sequence([
          animate('.1s ease', style({ opacity: '.2', transform: 'translateX(20px)', height: '*' })),
          animate('.35s ease', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

  private messagesClass: Map<ToastType, string> = new Map([
    [undefined as any, undefined as any],
    [ToastType.default, undefined],
    [ToastType.error, '-error'],
    [ToastType.info, '-info'],
    [ToastType.success, '-success'],
    [ToastType.warning, '-warning'],
  ]);

  constructor(
    public uiToastService: UiToastService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }

  getCssClassByType(type?: ToastType | number) {
    if (type != undefined) {
      return this.messagesClass.get(type);
    }

    return this.messagesClass.get(ToastType.default);
  }
}
