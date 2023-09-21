import { ControlValueAccessorMixin } from './../../../classes/control-value-accessor-mixin.class';
import { ReadOnlyDirective } from './../../../directives/readonly.directive';
import {
  Component, ElementRef, forwardRef, Input, Injector, Optional, ChangeDetectorRef, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioComponent } from '../radio/radio.component';

@Component({
  selector: 'ui-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioGroupComponent extends ControlValueAccessorMixin implements OnInit {

  @Input() label!: string;

  selectedRadio!: RadioComponent;

  private elemRef: ElementRef;

  constructor(
    elementRef: ElementRef,
    injector: Injector,
    protected override cdr: ChangeDetectorRef,
    @Optional() readOnlyDirective?: ReadOnlyDirective
  ) {
    super(elementRef, injector, readOnlyDirective);
    this.elemRef = elementRef;
  }

  ngOnInit() {
    this.elemRef.nativeElement.className = `brave-ui ${this.elemRef.nativeElement.className}`;
  }

  override writeValue(value: any) {
    super.writeValue(value);
    this.cdr.detectChanges();
  }

}
